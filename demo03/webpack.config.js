
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [

        ]
    },

    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML, 自动引入打包输出的所有资源(JS/CSS)
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制一个HTML文件作为模板
            template: './src/index.html'
        })
    ],

    mode: 'development'
}