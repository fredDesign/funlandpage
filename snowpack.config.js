
module.exports = {
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        compilerOptions: {
          embedSourceMap:true,
          loadPath: './node_modules',
        },
      },
    ],

    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eleventy',
        watch: '$1 --watch',
      },
    ],
    ["snowpack-plugin-raw-file-loader", {
      exts: [".eot"],
    }],
  ],
  mount: {
    '_dev': {
      url: '/',
      static: true,
    },
    'src/': '/static',
    'src/images': '/static/images',
  },
  devOptions: {
    out: "_dev/",
    clean: true,
    minify: true,
    sourcemap:false,
    /* ... */
    port: 8010
  },
  buildOptions: {
    out: "build/",
    //out: "_build/",
    clean: true,
    minify: true,
    sourcemap:false,
    baseUrl: ".",

  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
    entrypoints : ['src/scripts/index.js'],
  },
};
