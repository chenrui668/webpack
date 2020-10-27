
const {resolve} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            /*
                js兼容性处理：babel-loader @babel/core
                    1. 基本js兼容性处理：@babel/preset-env
                        问题：只能转换基本语法，如promise等高级语法不能转换
                    2. 全部js兼容性处理：@babel/polyfill 在js文件中引入使用
                        问题：会将所有兼容性代码引入，体积太大
                    3. 需要做兼容性处理的就做：按需加载：core-js
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示js做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js的版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]  
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    // 设置为生产模式，自动压缩js
    mode: 'production'
}