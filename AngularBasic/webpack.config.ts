import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as path from "path";
import { Configuration, DllReferencePlugin } from "webpack";
import * as webpackMerge from "webpack-merge";

import { isAOT, isProd, outputDir, WebpackCommonConfig } from "./webpack.config.common";

module.exports = (env: any) => {
    const prod = isProd(env);
    const aot = isAOT(env);
    const bundleConfig: Configuration = webpackMerge(WebpackCommonConfig(env, "main"), {
        entry: {
            app: [
                "./ClientApp/main.ts",
                "./ClientApp/styles/main.scss",
            ],
        },
        plugins: (prod ? [] : [
            // AOT chunk splitting does not work while this is active https://github.com/angular/angular-cli/issues/4565
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, outputDir, "vendor-manifest.json")),
            }),
        ]).concat(aot ? [
            new AngularCompilerPlugin({
                mainPath: "./ClientApp/main.ts",
                tsConfigPath: "./tsconfig.json",
                skipCodeGeneration: false,
                compilerOptions: {
                    noEmit: false,
                },
            }),
        ] : []),
    });

    return bundleConfig;
};
