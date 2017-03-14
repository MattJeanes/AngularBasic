/// <binding BeforeBuild='build' Clean='clean' ProjectOpened='watch' />
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var path = require('path');
var del = require('del');
var merge = require('merge-stream');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var cleancss = require('gulp-clean-css');
var filter = require('gulp-filter');
var systemJSBuilder = require('systemjs-builder');
var run = require('gulp-run');

var paths = {
    wwwroot: './wwwroot',
    sass: {
        src: ['./sass/**/*.scss'],
        dest: './css/'
    },
    lib: {
        src: [
            './node_modules/zone.js/dist/zone.js',
            './bower_components/system.js/dist/system.src.js',
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/hammerjs/hammer.js'
        ],
        dest: './lib/'
    },
    libcss: [
        {
            src: [

            ],
            dest: './css/lib/'
        }
    ],
    angular: {
        libs: {
            'core': './node_modules/@angular/core/bundles/core.umd.js',
            'common': './node_modules/@angular/common/bundles/common.umd.js',
            'compiler': './node_modules/@angular/compiler/bundles/compiler.umd.js',
            'platform-browser': './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
            'platform-browser-dynamic': './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            'http': './node_modules/@angular/http/bundles/http.umd.js',
            'router': './node_modules/@angular/router/bundles/router.umd.js',
            'forms': './node_modules/@angular/forms/bundles/forms.umd.js',
            'material': './node_modules/@angular/material/bundles/material.umd.js'
        },
        dest: './lib/@angular/'
    },
    modules: [
        {
            name: 'rxjs',
            src: ['./node_modules/rxjs/**/*.js','!./node_modules/rxjs/src/**/*.js'],
            dest: './lib/rxjs/'
        }
    ],
    bundle: {
        root: './',
        dest: './lib',
        bundle: 'app/main.js',
        name: './lib/bundle.js'
    }
}

gulp.task('bundle', function () {
    var builder = new systemJSBuilder(paths.bundle.root);
    builder.config({
        baseURL: './',
        packages: {
            '.': {
                defaultExtension: 'js'
            }
        },
        paths: {
            '*': 'lib/*',
            'app/*': 'app/*'
        }
    });
    del.sync(path.join(paths.bundle.dest, paths.bundle.name), { force: true });
    return builder.bundle(paths.bundle.bundle, paths.bundle.name, {
        sourceMaps: true
    })
})

gulp.task('modules', function () {
    var streams = []
    for (let module of paths.modules) {
        streams.push(
            gulp.src(module.src)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, uglify({ source_map: true })))
                .pipe(gulpif(global.full, sourcemaps.write(`${module.name ? '.' : ''}./maps/${module.name ? module.name : ''}`)))
                .pipe(gulp.dest(path.join(paths.wwwroot,module.dest)))
        );
    }
    return merge(streams);
})

gulp.task('libcss', function () {
    var streams = []
    for (let module of paths.libcss) {
        var f = filter("**/*.css", { restore: true });
        streams.push(
            gulp.src(module.src)
                .pipe(f)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, cleancss()))
                .pipe(gulpif(global.full, sourcemaps.write(`${module.name ? '.' : ''}./maps/${module.name ? module.name : ''}`)))
                .pipe(f.restore)
                .pipe(gulp.dest(path.join(paths.wwwroot,module.dest)))
        );
    }
    return merge(streams);
})

gulp.task('angular', function () {
    var streams = []
    for (let name in paths.angular.libs) {
        let file = paths.angular.libs[name];
        streams.push(
            gulp.src(file)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, uglify({ source_map: true })))
                .pipe(rename((path => { path.basename = name })))
                .pipe(gulpif(global.full, sourcemaps.write('../maps/angular')))
                .pipe(gulp.dest(path.join(paths.wwwroot,paths.angular.dest)))
        );
    }
    return merge(streams);
})

gulp.task('lib', function () {
    return gulp.src(paths.lib.src)
        .pipe(gulpif(global.full, sourcemaps.init()))
        .pipe(gulpif(global.full, uglify({ source_map: true })))
        .pipe(rename(function (path) {
            switch (path.basename) {
                case "system.src":
                    path.basename = "system";
                    break;
                case "Reflect":
                    path.basename = "reflect";
                    break;
                case "hammer":
                    path.basename = "hammerjs";
                    break;
            }
        }))
        .pipe(gulpif(global.full, sourcemaps.write('maps')))
        .pipe(gulp.dest(path.join(paths.wwwroot,paths.lib.dest)))
})

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(changed(paths.sass.dest))
        .pipe(gulpif(global.full, sourcemaps.init()))
        .pipe(sass({ outputStyle: global.full ? 'compressed' : 'nested' }).on('error', sass.logError))
        .pipe(gulpif(global.full, sourcemaps.write('maps')))
        .pipe(gulp.dest(path.join(paths.wwwroot,paths.sass.dest)))
});

gulp.task('clean', function () {
    return del([
        paths.sass.dest,
        paths.lib.dest,
        paths.angular.dest,
        ...paths.modules.map(m => m.dest),
        ...paths.libcss.map(m => m.dest)
    ].map(x => path.join(paths.wwwroot, x)), { force: true });
})

gulp.task('typescript', function () {
    return run('tsc').exec();
});

gulp.task('fullvar', () => { global.full = true });
gulp.task('libs')
gulp.task('copy', ['lib', 'libcss', 'angular', 'modules']);
gulp.task('compile', ['sass']);
gulp.task('build', callback => runSequence('copy', 'compile', callback));
gulp.task('full', callback => runSequence('clean', 'build', callback));
gulp.task('publish', callback => runSequence('fullvar', 'full', 'typescript', 'bundle', callback));

gulp.task('watch', function () {
    gulp.watch(paths.sass.src, ['sass']);
});
