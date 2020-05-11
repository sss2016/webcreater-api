const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssPlugin = require("mini-css-extract-plugin");
module.exports = {
	// 入口文件
    entry: './SSR/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public/dist/ssr')
    },
    module: {
    	// 配置相应的规则
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssPlugin.loader,'css-loader', 'postcss-loader']
            }, {
                test: /\.js[x]?$/,
                use: {
                  loader:'babel-loader',
                  options: {
                    presets: ["@babel/react", "@babel/preset-env"],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                  }
                },
                exclude: /node_modules/,

            }, {
                test: /\.less$/,
                use: [MiniCssPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'],
            },{
              test: /\.(png|jpe?g)/i,
              use: [
                {
                  loader: "url-loader",
                  options: {
                    name: "./img/[name].[ext]",
                    limit: 10000
                  }
                },
                {
                  loader: "img-loader"
                }
              ]
            }
        ]
    },
    //target: 'node', //不将node自带的诸如path、fs这类的包打进去
    // 配置相应的插件
    plugins: [
      new MiniCssPlugin({
        filename:'bundle.css'
      })
        // new HtmlWebpackPlugin({
        //     template: './public/index.html'
        // }),
        // new CleanWebpackPlugin()
    ]
};
