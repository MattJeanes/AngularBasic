module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            '../../wwwroot/dist/vendor.js',
            '../../wwwroot/dist/boot-tests.js'
        ],
        preprocessors: {
            '*.ts': ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        mime: { 'application/javascript': ['ts','tsx'] },
        singleRun: true,
        webpack: require('../../webpack.config.js'),
        webpackMiddleware: { stats: 'errors-only' }
    });
};
