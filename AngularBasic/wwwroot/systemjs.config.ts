SystemJS.import('/app/config.js').then((module: any) => {
    var config = module.config.systemJS;
    SystemJS.config({
        baseURL: '/lib',
        packages: {
            '.': {
                defaultExtension: 'js'
            }
        },
        map: { app: '../app' }
    })

    if (config.bundle) {
        SystemJS.import('bundle').then(() => {
            SystemJS.import('/app/main');
        })
    } else {
        SystemJS.import('/app/main')
    }
});