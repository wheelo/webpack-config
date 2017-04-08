/* webpack 两个配置文件: webpack.config用于生产环境
 * 本文件用于开发
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 项目的其实目录，include的目录
var projectRoot = path.resolve(__dirname, '../src');
var srcPath = path.resolve(__dirname, '../src');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// 配置环境
var environment = process.env.NODE_ENV || 'env1';


// 不同的入口，做各端打包
var entries = {
    a: srcPath + '/a/index.js',
    b: srcPath + '/b/index.js',
    c: srcPath + '/c/index.js'
};


// listening port
var listenPort = '1337';
// reload url
var reload = 'webpack-dev-server/client?http://localhost:' + listenPort;
// hot url: `only-dev-server` won't refresh browser in some cases
var hot = 'webpack/hot/dev-server';
// 'webpack-hot-middleware/client'

for (var bundle in entries) {
    entries[bundle] = [reload, hot, entries[bundle]];
}

// happyPack配置
var happyInstances = Object.keys(entries).map(function (entry, n) {
    return new HappyPack({
        id: entry,
        compilerId: '' + n,
        loaders: ['babel-loader'],
        verbose: false,
        cache: true,
        threadPool: happyThreadPool,
        cacheContext: {
            env: environment
        },
        tempDir: path.resolve(__dirname, '.happy/')
    });
});


var plugins = happyInstances.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ProgressBarPlugin({clear: true}),
    new ExtractTextPlugin('css/common/[name].min.css'),
    new webpack.DefinePlugin({
        'ENV': JSON.stringify(environment)
    }),
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new DashboardPlugin(dashboard.setData),
    new webpack.BannerPlugin('This file is created by Erik Peng')
]);


var happyLoaders = Object.keys(entries).map(function (entry, n) {
    return {
        test: /\.js$/,
        loader: 'happypack/loader?id=' + entry + '&compilerId=' + n,
        exclude: /node_modules/,
        include: projectRoot
    };
});


// 主体配置文件
module.exports = {
    listenPort: listenPort,
    open: false, // 是否需要自动打开浏览器
    dashboard: false, // 是否需要Dashboard支持
    openUrl: 'http://localhost:' + listenPort + '/',
    entry: entries,
    context: path.join(__dirname, '.'),

    output: {
        path: path.join(__dirname, '../dist', environment),
        filename: 'js/[name].min.js'
        // publicPath: '/static/'
    },

    // devtool: '#inline-source-map',
    // cheap-module-eval-source-map

    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: 'style!css',
            include: projectRoot
        },

        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
            'style-loader',
            [
                'css-loader?localIdentName=[local]___[hash:base64:5]',
                'autoprefixer?browsers=last 5 version',
                'less-loader'
            ]),
            include: projectRoot,
            exclude: [
                /\.mod\.less$/
            ]
        },

        {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=../../img/[name].[ext]'
        }
        // [hash:8]
        ]
        .concat(happyLoaders)
        // webpack.optimize.CommonsChunkPlugin
    },

    plugins: plugins,

    resolve: {
        alias: {
            'jsCommon': path.resolve(__dirname, srcPath + '/common/js')
        }
    }
};
