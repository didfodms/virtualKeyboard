const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry : "./src/js/index.js",
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname, "./dist"),
        clean : true
    },
    devtool : "source-map",
    mode : "development",
    devServer : {
        host : "localhost",
        port : 8080,
        // 서버 실행시마다 새 창을 열어라
        open : true,
        // index.html 파일이 변화가 있을때마다 reload를 해줘라
        // index.html 파일 변화 감지
        watchFiles : 'index.html'
    },
    plugins : [
        // lodash 문법을 사용하도록 해줌
        // lodash : 유틸 라이브러리 
        new HtmlWebpackPlugin({
            title : "keyboard",
            template : "./index.html",
            inject : "body",
            favicon : "./favicon.ico"
        }),
        new MiniCssExtractPlugin({filename:"style.css"})
    ],
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization : {
        minimizer : [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}