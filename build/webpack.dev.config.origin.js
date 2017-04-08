/**
 * @file server: Webpack Dev Server
 * @author Erik Peng<wheelo@163.com>
 */


var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.dev.config');

var app = express();
var compiler = webpack(config);

var bird = require('birdv3');

app.use(require('webpack-dev-middleware')(compiler,  {
    noInfo: false,
    stats: {
        chunks: false,
        chunkModules: false,
        hash: false,
        colors: {level: 2, hasBasic: true, has256: true, has16m: false}
    },
    quiet: false,
    lazy: false,
    hot: false,
    poll: true,
    inline: true // 实时刷新
    // publicPath: './content'
}));

// app.use(require('webpack-hot-middleware')(compiler));

app.use(bird('./bird/birdfile'));
app.use('/', express.static('./src/'));


app.listen(config.listenPort, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Listening at http://localhost:' + config.listenPort + '/');
});
