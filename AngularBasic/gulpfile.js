"use strict";

const gulp = require("gulp");
const run = require("gulp-run");
const runSequence = require("run-sequence");
const del = require("del");
const path = require("path");
const fs = require("fs");
require("ts-node/register");

const outputDir = "./wwwroot/dist";
global.aot = true;

function getEnvOptions() {
    var env = [];
    if (global.prod) {
        env.push("prod");
    }
    if (global.analyse) {
        env.push("analyse");
    }
    if (global.aot) {
        env.push("aot");
    }
    return env;
}

function getOptions() {
    var envOptions = getEnvOptions();
    const options = [];
    for (const option of envOptions) {
        options.push(`--env.${option}`);
    }
    if (options.length > 0) {
        return " " + options.join(" ");
    } else {
        return "";
    }
}

function webpack(type) {
    return run(`webpack --config webpack.config${type ? `.${type}` : ""}.ts${getOptions()}`).exec();
}

gulp.task("vendor", () => {
    let build = false;
    const vendorPath = path.join(outputDir, "vendor.js");
    const vendorExists = fs.existsSync(vendorPath);
    if (vendorExists) {
        const vendorStat = fs.statSync(vendorPath);
        const packageStat = fs.statSync("package.json");
        const vendorConfigStat = fs.statSync("webpack.config.vendor.ts");
        const commonConfigStat = fs.statSync("webpack.config.common.ts");
        if (packageStat.mtime > vendorStat.mtime) {
            build = true;
        }
        if (vendorConfigStat.mtime > vendorStat.mtime) {
            build = true;
        }
        if (commonConfigStat.mtime > vendorStat.mtime) {
            build = true;
        }
    } else {
        build = true;
    }
    if (build) {
        var envOptions = getEnvOptions();
        var env = {};
        for (const option of envOptions) {
            env[option] = true;
        }
        var config = require("./webpack.config.vendor.ts")(env);
        if (config.entry.vendor.length) { // webpack will crash if given an empty entry list 
            return webpack("vendor");
        }
    }
});

gulp.task("vendor_force", () => {
    return webpack("vendor");
})

gulp.task("main", () => {
    return webpack()
});

gulp.task("prod_var", () => {
    global.prod = true;
})

gulp.task("analyse_var", () => {
    global.analyse = true;
})

gulp.task("clean", () => {
    del.sync(outputDir, { force: true });
});

gulp.task("test_compile", function () {
    return webpack("test");
});

gulp.task("test_run", function () {
    return run("karma start ClientApp/test/karma.conf.js").exec();
});

gulp.task("test", callback => runSequence("test_compile", "test_run", callback));
gulp.task("lint", () => run("npm run lint").exec());
gulp.task("lint_fix", () => run("npm run lint -- --fix").exec());
gulp.task("build", callback => runSequence("vendor", "main", callback));
gulp.task("analyse", callback => runSequence("analyse_var", "clean", "build", callback));
gulp.task("full", callback => runSequence("clean", "build", callback));
gulp.task("publish", callback => runSequence("prod_var", "full", callback));