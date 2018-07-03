import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";

const input = "src/index.ts";

export default [
  {
    input,
    output: [
      {
        file: "dist/observer.js",
        name: "observer",
        format: "umd",
        sourcemap: true,
        globals: {
          mobx: "mobx",
        },
      },
      {
        file: "dist/observer.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    external: ["mobx"],
    plugins: [typescript()],
  },
  {
    input,
    output: [
      {
        file: "dist/observer.min.js",
        name: "observer",
        format: "umd",
        sourcemap: true,
        globals: {
          mobx: "mobx",
        },
      },
      {
        file: "dist/observer.esm.min.js",
        format: "es",
        sourcemap: true,
      },
    ],
    external: ["mobx"],
    plugins: [typescript(), babel()],
  },
  {
    input,
    output: {
      file: "dist/observer.es5.min.js",
      name: "observer",
      format: "umd",
      globals: {
        mobx: "mobx",
      },
      sourcemap: true,
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
      babel(),
    ],
  },
];
