module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            '../../wwwroot/dist/tests.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        mime: { 'application/javascript': ['ts','tsx'] },
        singleRun: true,
    });
};
