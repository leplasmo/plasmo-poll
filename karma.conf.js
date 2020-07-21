// ./karma.conf.js

// Using webpack configuration
let webpackConfig = require('./webpack.config.js');
webpackConfig.mode = 'development';

delete webpackConfig.entry; // No entry for tests
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      'test/**/*.spec.js': ['eslint', 'webpack'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
