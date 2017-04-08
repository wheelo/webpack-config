var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

var os = require('os');

// 配置环境
var environment = process.env.NODE_ENV || 'env1';

var srcPath = path.resolve(__dirname, '../src');
// 不同的入口，做各端打包
var entries = {
    a: srcPath + '/a/index.js',
    b: srcPath + '/b/index.js',
    c: srcPath + '/c/index.js'
};

// 两个环境变量env1 与 env2
module.exports = ['env1', 'env2'].map(function (environment) {
    return {
        // 不同的入口，做各端打包
        entry: entries,

        output: {
            path: path.join(__dirname, '../dist', environment),
            filename: 'js/[name].min.js'
            // publicPath: '/static/'
        },

        module: {
            loaders: [{
                    test: /\.css$/, 
                    loader: 'style!css'
                },
                {
                    test: /\.js$/,
                    loader:'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    exclude: [
                        /\.mod\.less$/
                    ],
                    loader: ExtractTextPlugin.extract(
                      'style-loader',
                      [
                          'css-loader?localIdentName=[local]___[hash:base64:5]',
                          'autoprefixer?browsers=last 2 version',
                          'less-loader'
                      ])
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'file-loader?name=../../img/[name].[ext]'
                }
            ]
        },
        plugins: [
            new CopyPlugin([
                {from: srcPath + '/*/*.html', to: '[name].html'},
                {from: srcPath + '/*/img/*', to: 'img/[name].[ext]'},
                {from: srcPath + '/*.html', to: '[name].html'}
            ]),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ProgressBarPlugin({clear: true}),
            new ExtractTextPlugin('css/common/[name].min.css'),
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(environment)
            }),
            // new webpack.optimize.UglifyJsPlugin({
            new UglifyJsParallelPlugin({
                workers: os.cpus().length,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }),
            new webpack.BannerPlugin('This file is created by Erik Peng')
        ],
        resolve: {
            alias: {
                'jsCommon': path.resolve(__dirname, srcPath + '/common/js')
            }
        }
    };
});