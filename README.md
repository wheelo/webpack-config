# webpack-config
My own webpack configure with [happypack](https://github.com/amireh/happypack), [birdv3](https://www.npmjs.com/package/birdv3), webpack hot-server & etc.


## Usage
[I've just tranfered all config files to the `build` folder.] The `build` folder includes all config files you needed, one config for `development` and the other one for `production`. You can check both out, `webpack.config.js` and `webpack.dev.config.js`.

```sh
>> npm start
>> npm run dev:env1
```

It comes with several features out of my `development` config files, `hot-reload`, `happypack`, `auto-start server` and `dashboard` features are all integrated with some options to your choices. The production environment yet comes with more powerful features, like `parallel-webpack`, `Dll`, `UglifyJsParallelPlugin`, `CopyPlugin` and some other nice features. 

All features displayed above are battle-tested, just relax and use it in your project.😊
