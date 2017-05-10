/// <binding BeforeBuild='build' Clean='clean' ProjectOpened='watch' />
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var del = require('del');
var merge = require('merge-stream');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var cleancss = require('gulp-clean-css');
var filter = require('gulp-filter');
var systemJSBuilder = require('systemjs-builder');
var run = require('gulp-run');
var fs = require('fs');

var wwwroot = './wwwroot';

var paths = {
    wwwroot: wwwroot,
    npm: { // These will be resolved automatically and copied to output directory as its name, only works for pre-bundled modules e.g. angular
        src: [
            '@angular/animations',
            '@angular/animations/browser',
            '@angular/core',
            '@angular/common',
            '@angular/compiler',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/http',
            '@angular/router',
            '@angular/forms',
            '@angular/platform-browser/animations'
        ],
        dest: './lib'
    },
    lib: { // These are simple single-file dependencies with optional rename, for more files or folders use modules
        src: [
            {
                file: './node_modules/systemjs/dist/system.src.js',
                rename: 'system'
            },
            {
                file: './node_modules/systemjs/dist/system-polyfills.src.js',
                rename: 'system-polyfills'
            }
        ],
        dest: './lib/'
    },
    libcss: [
        {
            src: [
                "./node_modules/primeng/resources/primeng.css" // PrimeNG
            ],
            dest: "./css/lib"
        }
    ],
    modules: [ // This is for modules with multiple files that require each other, used when npm can't be used
        {
            name: 'zone.js',
            src: ['./node_modules/zone.js/**/*.js'],
            dest: './lib/zone.js/'
        },
        {
            name: 'rxjs',
            src: ['./node_modules/rxjs/**/*.js', '!./node_modules/rxjs/src/**/*.js'],
            dest: './lib/rxjs/'
        },
        {
            name: 'core-js',
            src: ['./node_modules/core-js/**/*.js'],
            dest: './lib/core-js/'
        },
        { // PrimeNG
            name: 'primeng',
            src: './node_modules/primeng/**/*.js',
            dest: './lib/primeng/'
        }
    ],
    sass: [ // Simple sass->css compilation
        {
            src: ['./Styles/**/*.scss'],
            dest: './css/'
        },
        {
            src: path.join(wwwroot, 'app/**/*.scss'),
            dest: 'app/',
            filter: '**/*.css'
        }
    ],
    bundle: { // This is the config for the bundler, you shouldn't need to change this
        root: './',
        dest: './lib/bundle.js',
        bundle: 'app/main.js',
        app: 'app/**/*',
        config: {
            baseURL: wwwroot,
            packages: {
                '.': {
                    defaultExtension: 'js'
                }
            },
            map: {
                text: 'app/text-loader'
            },
            meta: {
                '*.css': {
                    loader: 'text'
                },
                '*.html': {
                    loader: 'text'
                }
            },
            paths: {
                '*': 'lib/*',
                'app/*': 'app/*'
            }
        }
    }
}

gulp.task('npm', function () {
    var streams = []
    for (let module of paths.npm.src) {
        let file = require.resolve(module);
        streams.push(
            gulp.src(file)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, uglify({ source_map: true })))
                .pipe(rename((path => { path.basename = module })))
                .pipe(gulpif(global.full, sourcemaps.write('../maps')))
                .pipe(gulp.dest(path.join(paths.wwwroot, paths.npm.dest)))
        );
    }
    return merge(streams);
})

gulp.task('lib', function () {
    var streams = []
    for (let module of paths.lib.src) {
        streams.push(
            gulp.src(typeof module === "string" ? module : module.file)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, uglify({ source_map: true })))
                .pipe(rename(function (path) {
                    if (typeof module !== "string" && module.rename) {
                        path.basename = module.rename;
                    }
                }))
                .pipe(gulpif(global.full, sourcemaps.write('maps')))
                .pipe(gulp.dest(path.join(paths.wwwroot, paths.lib.dest)))
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
                .pipe(gulp.dest(path.join(paths.wwwroot, module.dest)))
        );
    }
    return merge(streams);
})

gulp.task('modules', function () {
    var streams = []
    for (let module of paths.modules) {
        streams.push(
            gulp.src(module.src)
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(gulpif(global.full, uglify({ source_map: true })))
                .pipe(gulpif(global.full, sourcemaps.write(`${module.name ? '.' : ''}./maps/${module.name ? module.name : ''}`)))
                .pipe(gulp.dest(path.join(paths.wwwroot, module.dest)))
        );
    }
    return merge(streams);
})

gulp.task('sass', function () {
    var streams = []
    for (let module of paths.sass) {
        streams.push(
            gulp.src(module.src)
                .pipe(changed(module.dest))
                .pipe(gulpif(global.full, sourcemaps.init()))
                .pipe(sass({ outputStyle: global.full ? 'compressed' : 'nested' }).on('error', sass.logError))
                .pipe(gulpif(global.full, sourcemaps.write('maps')))
                .pipe(gulp.dest(path.join(paths.wwwroot, module.dest)))
        );
    }
    return merge(streams);
});

gulp.task('bundle', ['typescript_firstrun'], function () {
    var builder = new systemJSBuilder(paths.bundle.root);
    builder.config(paths.bundle.config);
    del.sync(path.join(paths.wwwroot, paths.bundle.dest), { force: true });
    return builder.bundle(paths.bundle.bundle + (global.full ? '' : ' - [' + paths.bundle.app + ']'), path.join(paths.wwwroot, paths.bundle.dest), {
        sourceMaps: global.full
    })
})

gulp.task('clean', function () {
    return del([
        ...paths.sass.map(m => m.filter ? path.join(m.dest, m.filter) : m.dest),
        paths.lib.dest,
        paths.bundle.dest,
        ...paths.modules.map(m => m.dest)
    ].map(x => path.join(paths.wwwroot, x)), { force: true });
})

// Runs the TypeScript compiler
function runTSC() {
    return run('tsc').exec();
}

// Allows app to bundle libs on first run by compiling the app first, only compiles if entry point doesn't exist
gulp.task('typescript_firstrun', function () {
    var bundle = path.join(paths.wwwroot, paths.bundle.bundle);
    var exists = fs.existsSync(bundle);
    if (!exists) {
        console.log(`'${bundle}' doesn't exist - compiling TypeScript`);
        return runTSC();
    }
})

gulp.task('typescript', function () {
    return runTSC();
});

gulp.task('fullvar', () => { global.full = true });
gulp.task('copy', ['lib', 'libcss', 'npm', 'modules']);
gulp.task('compile', callback => runSequence('copy', 'sass', callback));
gulp.task('build', callback => runSequence('compile', 'bundle', callback));
gulp.task('full', callback => runSequence('clean', 'compile', callback));

// Use this in a build server environment to compile and bundle everything
gulp.task('publish', callback => runSequence('fullvar', 'full', 'typescript', 'bundle', callback));

// Auto compiles sass files on change, note that this doesn't seem to pick up new files at the moment
gulp.task('watch', function () {
    gulp.watch([].concat(...paths.sass.map(x => typeof (x.src) === "string" ? [x.src] : x.src)), ['sass']);
});