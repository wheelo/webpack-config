/**
 * @file server: Webpack Dev Server
 * @author Erik Peng<wheelo@163.com>
 */

var path = require('path');
var webpack = require('webpack');
// var express = require('express');
var config = require('./webpack.dev.config');
var WebpackDevServer = require('webpack-dev-server');
var chalk = require('chalk');


// var chokidar = require('chokidar');
// var watcher = chokidar.watch('./dev-server.js');
// delete require.cache[id];
var compiler = webpack(config);
var bird = require('birdv3');

var globalApp = {};


// var app = express();
// "start": "cd start;./bin/webpack-dev-server.js --progress --colors --port 1337 --inline"
var app = new WebpackDevServer(compiler, {
    inline: false, // 实时刷新
    hot: true, // hot update
    noInfo: false,
    // historyApiFallback: true,  // 无刷新更改地址栏
    stats: {
        chunks: false,
        chunkModules: false,
        hash: false,
        colors: {level: 2, hasBasic: true, has256: true, has16m: false}
    },
    watchOptions: {
        aggregateTimeout: 180,
        poll: true
    },
    // compress: true,
    // 配合webpack-dashboard设置为true
    quiet: config.dashboard,
    lazy: false,
    setup: function (app) {
        var moduleSettings = ['a', 'b', 'c'];
        var moduleAssets = ['css', 'js'];
        var imgSettings = ['loading.gif', 'clear.png', 'logo.png'];
        app.use(function(req, res, next) {
            var originalUrl = req.originalUrl;
            var prts = originalUrl.split('/');
            // 可以自定义一些用户路由，方便调试
            if (prts[1] === 'img') {
                if (imgSettings.indexOf(prts[2]) > -1) {
                    res.redirect('/common/' + prts.join('/'));
                }
                if (prts[2] === 'arrow.png') {
                    res.redirect('/a/' + prts.join('/'));
                }
            }
            // console.log('@debug, ', originalUrl, prts);
            if (moduleSettings.indexOf(prts[1]) > -1
                && (moduleAssets.indexOf(prts[2]) > -1 || prts[2].indexOf('.hot-update.js') > -1)
                )
            {
                prts = prts.slice(2);
                // console.log('@debug, redirect to : ', '/' + prts.join('/'));
                res.redirect('/' + prts.join('/'));
            }
            else {
                next();
            }
        });
        // bird配置文件暂时放在后面
        globalApp = app;
    }
    /*
        proxy: {'/abc/*': 'abc.xyz.com'}
        publicPath: config.output.publicPath
    */
});


// 如果使用devMiddleWare就使用devMiddleware.waitUntilValid
// compiler.plugin('compilation')
compiler.plugin('done', function () {
    process.nextTick(function () {
        if (config.open) {
            // opn
            var open = require('open');
            open(config.openUrl);
        }
        globalApp.use(bird('./bird/birdfile'));
    });
});

if (config.dashboard) {
    var Dashboard = require('webpack-dashboard');
    var DashboardPlugin = require('webpack-dashboard/plugin');
    var dashboard = new Dashboard();
    compiler.apply(new DashboardPlugin(dashboard.setData));
}

// app.use(require('webpack-hot-middleware')(compiler));
// app.use('/', express.static('../src/'));
// app.use('/img', express.static('../src/img'));

app.listen(config.listenPort, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log(chalk.bold.green('Listening at http://localhost:' + config.listenPort + '/'));
});
