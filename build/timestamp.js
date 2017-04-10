/**
 * @file 替换base64与添加时间戳处理
 */

// node build/timestamp.js
var replace = require('replace');

var rand = function(len) {
    var x = "0123456789POIUYTREWQLKJHGFDSAMNBVCXZpoiuytrewqlkjhgfdsamnbvcxz";
    var tmp = [];
    for (var i = 0; i < len; i++) {
        tmp.push(x.charAt(Math.ceil(Math.random() * 100000000) % x.length));
    }
    return tmp.join('');
};

replace({
    regex: /(.*\.min\.js|.*\.min\.css)\"/g,
    replacement: '$1?t=' + rand(6) + '"',
    include: '*.html',
    paths: ['../dist/env1/', '../dist/env2/'],
    recursive: true,
    silent: true
});
