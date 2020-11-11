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
    mode: 'development',
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 监视 contentBase 目录下的所有文件，一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 忽视文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 去了一些基本启动信息以外，其他内同都不要显示
        quiet: true,
        // 如果出错了，不要全屏提示
        overlay: false,
        proxy: {
            // 一旦devServer(5000)服务器收到 /api/xxx的请求， 就会把请求转发到另一个服务器上（3000）
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx (去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}