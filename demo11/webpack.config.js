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

    mode: 'development',

    devtool: 'source-map'
}
/*
    source-map: 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪到源代码错误）

    [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map

    source-map: 外部
        错误信息准确信息 和 源代码的错误位置
    inline-source-map: 内联
        只生成一个内敛source-map
        错误信息准确信息 和 源代码的错误位置
    hidden-source-map: 外部
        错误代码错误原因，但是没有错误位置
        不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map: 内联
        每一个文件都生成对印的source-map，都在eval
        错误代码准确信息 和 源代码的错误位置
    nosources-source-map: 外部
        错误代码准确信息，但是没有任何源代码信息
    cheap-source-map: 外部
        错误代码准确信息 和 源代码的错误位置
        只能精确到行
    cheap-module-source-map: 外部
        错误代码准确信息 和 源代码的错误位置
        module会将loader的source-map加入

    内联 和 外部的区别：1.外部生成了文件，内联没有 2.内敛构建速度更快

    开发环境：速度快，调试更友好
        速度快（eval>inline>cheap>...）
            eval-cheap-source-map
            eval-source-map
        调试更友好
            source-map
            cheap-module-source-map
            cheap-source-map

        --> eval-source-map(react/vue脚手架开发模式默认使用) / eval-cheap-module-source-map

    生产环境：源代码要不要隐藏？调试要不要更友好
    内联会让代码体积变大，所以在生产环境不用内联
        nosource-source-map 全部隐藏
        hidden-source-map   只隐藏源代码，会提示构建后代码错误信息

        --> source-map / cheap-module-source-map

*/