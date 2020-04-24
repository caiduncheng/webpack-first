const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = require('./public/config')[isDev ?  'dev' : 'build']
module.exports = {
    mode: isDev ? 'development': 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(sc|c)ss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }                       
                    }
                }, 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]        
    },
    plugins: [
        // 数组，放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filname: 'index.html', // 打包后的文件名
            minify: {
                removeAttributeQuotes: false, // 是否删除属性的双引号
                collapseWhitespace: false //是否折叠空白                
            },
            config: config.template
            // hash: true //是否加上hash，默认是 false
        })
    ],
    /** devServer:
     * quite: 启用 quiet 后，
     * 除了初始启动信息之外的任何内容都不会被打印到控制台。
     * 这也意味着来自 webpack 的错误或警告在控制台不可见  
     * 我是不会开启这个的，看不到错误日志，还搞个锤子
     * 
     * stats: "errors-only" ， 
     * 终端中仅打印出 error，注意当启用了 quiet 或者是 noInfo 时，
     * 此属性不起作用。 ————— 这个属性个人觉得很有用，
     * 尤其是我们启用了 eslint 或者使用 TS进行开发的时候，
     * 太多的编译信息在终端中，会干扰到我们。
     * 
     * overlay: 启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
     */
    devServer: {
        port: 3000,
        quiet: false, 
        inline: true,
        stats: 'errors-only', 
        overlay: false,
        clientLogLevel: 'silent',
        compress: true
    },
    devtool: 'cheap-module-eval-source-map'
}