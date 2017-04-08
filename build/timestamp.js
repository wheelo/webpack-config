// 替换base64与添加时间戳处理

// node build/timestamp.js
var replace = require('replace');

var time = Date.now();

replace({
    regex: /timestamp=(.*)"/g,
    replacement: 'timestamp=' + time + '"',
    paths: ['./dist/b.html', './dist/a.html'],
    recursive: true,
    silent: true
});
