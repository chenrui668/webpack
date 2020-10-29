const { output } = require("../demo05/webpack.config");

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 设置node的环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式引入
                    // 'style-loader',
                    // 这个loader取代'style-loader',作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js中
                    'css-loader',
                    // css兼容性处理：postcss --> postcss-loader postcss-preset-env
                    // 使用loader的默认配置
                    // 'postcss-loader'
                    // 修改loader的配置
                    // {
                    //     "browserslist": {

                    //         "development": [
                    //             "last 1 chrome version",
                    //             "last 1 firefox version",
                    //             "last 1 safari version"
                    //         ],
                                // 默认是看生产环境
                     //         "production": [
                    //             ">0.2%",
                    //             "not dead",
                    //             "not op_mini all"
                    //         ]
                    //     }
                    // }
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env',{}]]
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],

    mode: 'development'
}