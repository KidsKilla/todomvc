module.exports = function(config) {
    var webpackConfig = require('./build/webpack');
    webpackConfig.module.preLoaders = [{
        test: /\.jsx?$/,
        exclude: /(?:test|node_modules)\//,
        loader: 'isparta-instrumenter-loader'
    }];

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './test/**/*.spec.js',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/**/*.spec.js': ['webpack', 'sourcemap'],
        },

        // list of files to exclude
        exclude: [],

        plugins: [
            require('karma-coverage'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
        ],

        coverageReporter: {
            reporters: [
                {
                    type: 'text',
                },
                {
                    type: 'html',
                    dir: './coverage/',
                }
            ]
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },

        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // config.LOG_DISABLE
        // config.LOG_ERROR
        // config.LOG_WARN
        // config.LOG_INFO
        // config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
