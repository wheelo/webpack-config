var path = require('path');
var cp = require('child_process');
var chokidar = require('chokidar');
var chalk = require('chalk');

var watcher = chokidar.watch(path.join(__dirname, './*.js'), {
    ignored: /(^|[\/\\])\.happy./,
    persistent: true
});


var devServer = cp.fork(path.join(__dirname, './dev-server.js'));

watcher.on('ready', function () {
    watcher.on('change', function (path) {
        console.log(chalk.bold.magenta('\n## Webpack DevServer will reboot in Seconds ##'));
        devServer = reload(devServer);
    });
});


process.on('SIGINT', function () {
    process.exit(0);
});


function reload(appIns) {
    devServer.kill('SIGINT');
    return cp.fork(require('path').join(path.join(__dirname, './dev-server.js')));
}