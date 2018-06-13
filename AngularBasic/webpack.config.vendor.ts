import * as path from "path";
import * as webpack from "webpack";
import * as webpackMerge from "webpack-merge";
import { isProd, outputDir, WebpackCommonConfig } from "./webpack.config.common";

module.exports = (env: any) => {
    const prod = isProd(env);
    const bundleConfig = webpackMerge(WebpackCommonConfig(env, "vendor"), {
        output: {
            library: "[name]_[hash]",
        },
        entry: {
            vendor: (<string[]>[ // add any vendor styles here e.g. bootstrap/dist/css/bootstrap.min.css<% if(vendorcss) { if(covalent) { %>
                "@covalent/core/common/platform.css",<% } if(pace) { %>
                "pace-progress/themes/black/pace-theme-center-simple.css",<% } if (primeng) { %>
                "primeng/resources/primeng.min.css",
                "primeng/resources/themes/cruze/theme.css",<% } } else { %>
                // make sure to enable the vendor.css in the Views/Shared/_Layout.cshtml after adding something here<% } %>
            ]).concat(prod ? [] : [ // used to speed up dev launch time
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
                "@angular/router",<% if(material) { %>
                "@angular/material",
                "@angular/cdk",<% } if(covalent) { %>
                "@covalent/core",<% } if(pace) { %>
                "pace-progress",<% } if(primeng) { %>
                "primeng/primeng",<% } %>
                "jquery",
                "zone.js",
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
