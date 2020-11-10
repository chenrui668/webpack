const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/,
                // 多个loader用use
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除node_module下的js文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                // 单个loader用loader
                loader: 'eslint-loader',
                options: {
                    // 配置项
                }
            },
            {   
                // 对于同一个文件以下loader只会匹配一个
                oneOf: []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}