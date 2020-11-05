
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },

    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML, 自动引入打包输出的所有资源(JS/CSS)
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制一个HTML文件作为模板
            template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将之前单独打包的第三方库在html中引入
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],

    mode: 'production'
}