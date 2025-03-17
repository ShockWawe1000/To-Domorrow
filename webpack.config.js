const path = require("path");
const SRC_DIR = path.resolve(__dirname, "./src");
const DIST_DIR = path.resolve(__dirname, "./dist");


const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

var target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    entry: {
        index: SRC_DIR + "/index.js",
    },

    output: {
        path: DIST_DIR,
        //assetModuleFilename: "images/[name][ext][query]",
        chunkLoading: false,
        wasmLoading: false,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                // For pure CSS - /\.css$/i,
                // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
                // For Less - /\.((c|le)ss)$/i,
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: "asset",
            },
        ],
    },

    devtool: "source-map",

    target: target,

    devServer: {
        contentBase: "./dist",
        hot: true,
    },

    plugins: [
        // Automatically remove all unused webpack assets on rebuild
        // default: true
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        /*new CleanWebpackPlugin(),*/
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: SRC_DIR + "/index.html",
        }),
    ],
};