import * as path from "path";
import * as webpack from "webpack";
import * as webpackMerge from "webpack-merge";
import { isProd, WebpackCommonConfig } from "./webpack.config.common";

module.exports = (env: any) => {
    const prod = isProd(env);
    const outputDir = "./wwwroot/dist";
    const bundleConfig = webpackMerge(WebpackCommonConfig(env, "vendor"), {
        output: {
            library: "[name]_[hash]",
        },
        entry: {
            vendor: [
                "@covalent/core/common/platform.css",
                "pace-progress/themes/black/pace-theme-center-simple.css",
                "primeng/resources/primeng.min.css",
                "primeng/resources/themes/cruze/theme.css",
            ].concat(prod ? [] : [ // used to speed up dev launch time
                "@angular/animations",
                "@angular/common",
                "@angular/common/http",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/http",
                "@angular/platform-browser",
                "@angular/platform-browser/animations",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "@angular/material",
                "@angular/cdk",
                "@covalent/core",
                "pace-progress",
                "jquery",
                "zone.js",
                "primeng/primeng",
                "reflect-metadata",
                "core-js",
                "rxjs",
                "css-loader/lib/css-base",
                "core-js/es6/string",
                "core-js/es6/array",
                "core-js/es6/object",
                "core-js/es7/reflect",
                "hammerjs",
            ]),
        },
        plugins: prod ? [] : [
            new webpack.DllPlugin({
                path: path.join(__dirname, outputDir, "[name]-manifest.json"),
                name: "[name]_[hash]",
            }),
        ],
    });
    return bundleConfig;
};
