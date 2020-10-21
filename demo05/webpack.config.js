
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './',
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // 要使用多个loader处理用use
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader, 直接使用loader
                // 下载url-loader, file-loader url-loader依赖于file-loader
                loader: 'url-loader',
                options: {
                    // 图片大于8kb,就会被base64处理
                    // 优点：减少请求次数(减轻服务器压力)
                    // 缺点：图片体积会更大（请求速度更慢）
                    limit: 8 * 1024,
                    // url-loader默认使用es6模块化解析，而html-loader引入的是commonjs
                    // 关闭es6解析
                    esModule: false,
                    // 给图片重命名
                    // [hash:10] 取图片的hash的前10位
                    // [ext] 取图片原来的扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件中的图片（负责引入html中的img,从而能被url-loader处理）
                loader: 'html-loader'
            },
            // 打包其他资源（除html/css/js/...）
            {   
                // 排除
                exclude: /\.(html|css|js|less)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 开发服务器 devServer：用来自动化（自动编译，自动打包，自动打开浏览器，自动刷新浏览器。。。）
    // 特点: 只会在内存中编译打包，不会输出打包后的文件
    // 启动devServer指令：npx webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}