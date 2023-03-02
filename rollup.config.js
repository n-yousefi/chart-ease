import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/ChartEase.js",
    watch: {
      include: "./src/**",
      clearScreen: false,
    },
    output: {
      file: "site/js/chart-ease.js",
      format: "iife",
    },
  },

  {
    input: "site/js/chart-ease.js",
    watch: {
      include: "./dist/**",
      clearScreen: false,
    },
    output: {
      file: "dist/chart-ease.min.js",
      format: "iife",
      plugins: [
        terser({
          ecma: 2020,
          mangle: { toplevel: true },
          compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: true,
            drop_debugger: true,
          },
          output: { quote_style: 1 },
        }),
      ],
    },
  },
];
