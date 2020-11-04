
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const {resolve} = require('path');

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [['postcss-preset-env',{}]]
            }
        }
    }
]


module.exports = {
    entry: './src/js/index.js',
    output: {
        publicPath: './',
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            // 当一个文件要被多个loader处理，那么一定要指定loader的执行顺序
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理同一类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            ...commonCssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
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
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            esModule: false
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(html|css|less|js|png|jpg|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            /*
                1.帮助serviceworker快速启动
                2.删除旧的serviceworker

                生成一个serviceworker配置文件
            */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production'
}