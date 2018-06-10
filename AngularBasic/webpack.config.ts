import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import path = require("path");
import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

module.exports = (env: any) => {
    const prod = env && env.prod as boolean;
    console.log(prod ? "Production" : "Dev" + " main build");
    const analyse = env && env.analyse as boolean;
    if (analyse) { console.log("Analysing build"); }
    const cssLoader = prod ? "css-loader?-url&minimize" : "css-loader?-url";
    const outputDir = "./wwwroot/dist";
    const bundleConfig: Configuration = {
        mode: prod ? "production" : "development",
        entry: {
            main: [
                "./ClientApp/main.ts",
                "./ClientApp/styles/main.scss",
            ],
            vendor: [
                "@covalent/core/common/platform.css",
                "pace-progress/themes/black/pace-theme-center-simple.css",
                "primeng/resources/primeng.min.css",
                "primeng/resources/themes/cruze/theme.css",
            ],
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                pace: "pace-progress",
            },
        },
        output: {
            path: path.join(__dirname, outputDir),
            filename: "[name].js",
            chunkFilename: "[id].chunk.js",
            globalObject: "this",
            publicPath: "/",
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: "@ngtools/webpack" },
                { test: /\.html$/, use: "html-loader?minimize=false" },
                { test: /\.css$/, use: [MiniCssExtractPlugin.loader, cssLoader] },
                { test: /\.scss$/, include: /ClientApp(\\|\/)app/, use: ["to-string-loader", cssLoader, "sass-loader"] },
                { test: /\.scss$/, include: /ClientApp(\\|\/)styles/, use: [MiniCssExtractPlugin.loader, cssLoader, "sass-loader"] },
                { test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)(\?|$)/, use: "url-loader?limit=100000" },
                { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } }, // ignore System.import warnings https://github.com/angular/angular/issues/21560
            ],
        },
        plugins: [
            new AngularCompilerPlugin({
                mainPath: "./ClientApp/main.ts",
                tsConfigPath: "./tsconfig.json",
                skipCodeGeneration: false,
            }),
            new MiniCssExtractPlugin({
                filename: "main.css",
            }),
        ].concat(analyse ? [
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: "main.html",
                openAnalyzer: false,
            }),
        ] : []),
    };

    return bundleConfig;
};
