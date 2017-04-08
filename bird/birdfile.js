/**
 * @file bird配置文件
 * @author Erik Peng<wheelo@163.com>
 */


var npath = require('path');



module.exports = {
    // bird 的名称, 该名称也会作为 demo server 的一个信息传过去
    name: 'Bird Dev Server',

    // bird 启动的 port, 如果设置成 middle ware的话, 将失效
    // 注意: 这个设置无法进行动态更改
    // port: 1234,

    // middleware 的话, bird会return一个中间件函数, 默认为false
    // 注意: 这个设置无法进行动态更改
    // middleware: false,
    middleware: true,

    // 默认的 静态资源 rootC
    root: '../start/src',
    // root: npath.resolve(__dirname),

    // 目标后端, 默认为不设置
    useServer: 'serverA',

    // 所有预设的 servers
    servers: {
        serverA: {
            server: '', // Test environment
            cookie: ''
        }
    },

    // tdo
    // 需要一个完整路径, 如果没有设置, 或者是设置为空, 则root会默认作为mock的root
    mockRoot: '.',
    // 默认的文件夹入口, 即如果访问的是文件夹, 且本设置为非空, 则尝试返回该文件夹下的同名文件
    // 默认为 index.html
    defaultIndex: 'index.html',

    // routes 使用顺序单次匹配, 如果某一次匹配成功, 则不做下一次fallback匹配, 用于简单化整个数据转接的流程, 避免路由过于复杂, 调试繁琐
    routes: [
        // 匹配从root开始的url, 允许正则, 默认都是从起始开始匹配, 例如, '/api/' => /^\/api\//
        // 两种类型: 'mock' 和 'static'

        // mock: 从mockRoot开始计算
        /*
         如果 mock 文件返回一个函数, 那么将运行这个函数, 并返回 mock data
         函数原型: function(urlInfo, queryObject, postBody)
         */
        // {test: '/api/some-data.json', mock: 'mock/hi2'},
        // {test: '/api/some-other-data.json', mock: 'mock/hi'},

        // 如果没有指定 mock 或 static, 则理解为接口转发, 将走指定的后端 server, 如果没有指定 replace, 则不进行replace
        // {test: '(/api/)to/(data.json)', replace: '$1$2'},
        {test: '/mock/info', mock: 'mock/info.js'},
        {test: '/', static: '/'}

        // {test: '/', static: '/'},
        // {test: '/root', static: '/'},
        // {test: '/bpTaskService'},

        // static: 是匹配至静态资源
        // {test: '/root/', static: '/'},
        // {test: '/', static: '/index.html'}

        // json api 可以做成正则的形式
        // {test: '/todo.json', mock: 'mock/todo'}
    ],


    // 是否打印出debug信息
    debug: true,

    // @todo <<[ 给其他人看的 demo ]{c2i4y_gbr60jmp_iomwah1i}>>
    /*
     这个功能, 主要是为了改良我们的开发流程:

     现有的流程是, FE同学开发了很久之后, 推测上线, 然后再在线上环境给U同学和PM, RD看.
     这个流程相当漫长, 以至于看了demo之后, 要改东西十分仓促, 或是会产生无谓的额外工作.

     事实上, 由于使用bird开发, 我们本地也相当于起了一个台server, 只要知道ip, 就可以很方便让其他人访问
     但是, 获取ip, 生成连接, 发给别人是一个很繁琐的流程,

     所以, 我们尝试使用bird自动管理这些连接的方法:

     1. 启动一个大家能访问的server
     2. 某个开发人员, 如果打开bird进行开发的话, 那么, 这个bird隔一段时间, 会发送一个请求给server,
     a. 请求带的数据, 包括一些常用的页面的path (以及简单解释)
     3. server 得到这些请求, 会记住这些信息,
     4. server 提供一个链接列表的页面, 如果有人访问这个页面, server就会把当前 (一段时间内) 搜集的bird的信息
     生成一份连接列表展示出来, 只要点击, 就可以快速看到相应的demo

     */

    // 是否发送 demo 信息的更新连接, 默认为 true
    shouldSendDemo: '',

    // demoFrom: 'Erik Peng',

    // 所有当前的demo
    demos: {}
};
