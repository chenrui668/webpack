/*
    使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
        当你运行webpack时，默认查找webpack.config.js 配置文件
        需求：需要运行webpack.dll.js文件
            --> webpack --config webpack.dll.js
*/

const { resolve } = require('path');
const webpack = requier('webpack');

module.exports = {
    entry: {
        // jquery --> 最终打包生成的[name]
        // ['jquery'] --> 要打包的库时jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]'// 打包的库里面向外暴露出去的名字是什么
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]', // 映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
    ],
    mode: 'production'
}