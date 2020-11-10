const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（目录+指定名称）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> './imgs/a.jpg'
        publicPath: './',
        chunkFilename: 'js/[name]_chunk.js', //非入口chunk的打包后名称（代码分割或懒加载和预加载单独打包的文件）
        // library: '[name]', // 整个库向外暴露的变量名
        // libraryTarget: 'window' // 变量名称加到哪个上 browser
        // libraryTarget: 'global' // node
        // libraryTarget: 'commonjs'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}