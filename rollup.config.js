import typescript from "rollup-plugin-typescript2";

const input = "src/observer.ts";

export default [
    {
        input,
        output: [
            {
                file: "dist/observer.esm.js",
                format: "es",
                sourcemap: true,
            },
            {
                file: "dist/observer.js",
                name: "observer",
                format: "umd",
                sourcemap: true,
                globals: {
                    mobx: "mobx",
                },
            },
        ],
        external: ["mobx"],
        plugins: [typescript()],
    },
    {
        input,
        output: {
            file: "dist/observer.es5.js",
            name: "observer",
            format: "umd",
            sourcemap: true,
            globals: {
                mobx: "mobx",
            },
        },
        external: ["mobx"],
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        target: "es5",
                    },
                },
            }),
        ],
    },
];
