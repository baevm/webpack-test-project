# webpack-test-project

webpack + tsloader - ~4000 ms (type checking at build)

webpack + babel-loader + ts react presets - ~2900ms (no type checking at build)
webpack + swc-loader - ~2700ms (no type checking at build)
webpack + esbuild-loader - ~2700ms (no type checking at build)

vite - ~900ms (type checking at build)