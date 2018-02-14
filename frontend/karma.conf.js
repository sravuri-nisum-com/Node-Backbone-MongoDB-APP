// // Karma configuration
// // Generated on Tue Feb 13 2018 13:17:36 GMT-0800 (PST)

// module.exports = function(config) {
//   config.set({
//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: "",

//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ["jasmine","jasmine-core"],

//     // list of files / patterns to load in the browser
//     files: ["src/js/*.spec.js "],

//     // list of files / patterns to exclude
//     exclude: [],
//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     // preprocessors: {
//     //   "test/*": ["webpack"]
//     // },

//     // webpack: {
//     //   resolve: {
//     //     extensions: ["", ".js"]
//     //   },
//     //   module: {}
//     // },

//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     // preprocessors: {},

//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ["progress"],

//     // web server port
//     port: 9876,

//     // enable / disable colors in the output (reporters and logs)
//     colors: true,

//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,

//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,

//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ["Chrome"],

//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,

//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity
//   });
// }
var path = require("path"),
  webpack = require("webpack");
  
module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["src/js/*.js", "src/js/*.spec.js"],
    preprocessors: {
      "src/**/*.js": ["coverage"]
    },

    // preprocessors: {
    //   "**/src/js/*.js": ["coverage"]
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",

        _: "underscore",
        Backbone: "backbone"
      }),

      "karma-jasmine",
      "karma-phantomjs-launcher",
      "karma-coverage",
      "karma-webpack"
    ],
    // plugins: ["karma-jasmine", "karma-phantomjs-launcher", "karma-coverage"],
    reporters: ["progress", "coverage"],
    port: 9878,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autowatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
    concurrency: Infinity,
    coverageReporter: {
      includeAllSources: true,
      dir: "coverage/",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }]
    }
  });
};
