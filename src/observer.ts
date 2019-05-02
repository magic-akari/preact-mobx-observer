import { Component } from "preact";
import { Reaction } from "mobx";

const augment = <O extends any, K extends keyof O>(object: O, key: K, func: Function) => {
    const origMethod = object[key];
    object[key] = function(this: O) {
        func.apply(this, arguments);
        if (origMethod) {
            return (origMethod as Function).apply(this, arguments);
        }
    } as O[K];
};

const mobxReaction = Symbol("mobxReaction");

type CompWithSymbol = Component & { [mobxReaction]?: Reaction | null };

export const observer = (comp: any) => {
    const componentClass = comp as typeof Component;

    augment(componentClass.prototype, "componentWillMount", function(this: CompWithSymbol) {
        const compName = (this.constructor as typeof Component).displayName || this.constructor.name;
        this[mobxReaction] = new Reaction(`${compName}.render()`, () => this.setState({}));
    });

    augment(componentClass.prototype, "componentWillUnmount", function(this: CompWithSymbol) {
        this[mobxReaction]!.dispose();
        this[mobxReaction] = null;
    });

    const origRender = componentClass.prototype.render;
    componentClass.prototype.render = function(this: CompWithSymbol, props?, state?, context?) {
        let renderResult: ReturnType<typeof origRender>;
        this[mobxReaction]!.track(() => {
            renderResult = origRender.call(this, props, state, context);
        });

        return renderResult!;
    };
};
