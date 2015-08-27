module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'src/js/kendo-2015.1.429/styles/kendo.common-material.min.css',
      'src/js/kendo-2015.1.429/styles/kendo.material.min.css',
      "src/js/kendo-2015.1.429/styles/kendo.dataviz.min.css",
      "src/js/kendo-2015.1.429/styles/kendo.dataviz.material.min.css",
      "src/js/kendo-2015.1.429/styles/kendo.dataviz.default.min.css",
      "src/js/kendo-2015.1.429/styles/Material/sprite.png",
      "src/css/kendo.tiny.css",
      'src/app/require.config.js',
      'test/require.config.js',
      'test/SpecRunner.karma.js',
      { pattern: 'src/app/startup.js', included: false },
      { pattern: 'src/app/startup.js', included: false },
      { pattern: 'src/**/*.js', included: false },
      { pattern: 'src/**/*.html', included: false },
      { pattern: 'test/**/*.js', included: false }
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/require.config.js': ['requireglobal']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'/*, 'clear-screen'*/],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
