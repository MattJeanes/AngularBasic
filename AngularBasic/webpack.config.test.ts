import { Configuration } from "webpack";
import * as webpackMerge from "webpack-merge";

import { WebpackCommonConfig } from "./webpack.config.common";

module.exports = (env: any) => {
    const bundleConfig: Configuration = webpackMerge(WebpackCommonConfig(env, "main"), {
        entry: {
            tests: [
                "./ClientApp/test/boot-tests.ts",
            ],
        },
    });

    return bundleConfig;
};
