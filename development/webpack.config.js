
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',

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
        open: true
    },

    mode: 'development'
}