// 替换base64与添加时间戳处理

// node build/timestamp.js
var replace = require('replace');

var time = Date.now();

replace({
    regex: /timestamp=(.*)"/g,
    replacement: 'timestamp=' + time + '"',
    paths: ['./dist/index.html', './dist/register.html'],
    recursive: true,
    silent: true
});
