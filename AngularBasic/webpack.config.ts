import { AngularCompilerPlugin } from "@ngtools/webpack";
import path = require("path");
import { Configuration, DllReferencePlugin } from "webpack";
import * as webpackMerge from "webpack-merge";

import { isProd, outputDir, WebpackCommonConfig } from "./webpack.config.common";

module.exports = (env: any) => {
    const prod = isProd(env);
    const bundleConfig: Configuration = webpackMerge(WebpackCommonConfig(env, "main"), {
        entry: {
            app: [
                "./ClientApp/main.ts",
                "./ClientApp/styles/main.scss",
            ],
        },
        plugins: prod ? [
            new AngularCompilerPlugin({
                mainPath: "./ClientApp/main.ts",
                tsConfigPath: "./tsconfig.json",
                skipCodeGeneration: false,
            }),
        ] : [
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, outputDir, "vendor-manifest.json")),
            }),
        ],
    });

    return bundleConfig;
};
