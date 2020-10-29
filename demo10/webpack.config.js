/*
    HMR: hot module replaceMent 热模块替换
    作用：一个模块发生变化，只会重新打包这一个模块，不会打包所有模块
    极大提升构建速度

        样式文件：可以使用HMR功能，因为style-loader内部实现了
        js文件：默认不能使用HMR功能 -->需要修改js代码，添加支持HMR功能的代码
        html文件：默认不能使用HMR功能，同时会导致问题：html不能热更新了（不需要HMR功能）
            解决：修改entry入口，将html文件引入

*/



const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],

    output: {
        publicPath: './',
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            // 处理less
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 处理css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // 关闭es6
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            // 处理html中的图片
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 处理其他资源
            {
                exclude: /\.(html|js|css|less|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        hot: true
    },

    mode: 'development'
}