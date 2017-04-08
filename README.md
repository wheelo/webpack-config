# webpack-config
My own webpack configure with [happypack](https://github.com/amireh/happypack), [birdv3](https://www.npmjs.com/package/birdv3), webpack hot-server & etc.


## Usage
The `build` folder nearly includes all config files of this repo, the environment of `development` and `production` is distinguished. Bascically, `webpack.config.js`, `webpack.dev.config.js` are the entries of the two distinguished environment, you should go check them out.

```sh
>> npm start
>> npm run dev:env1
>> npm run build
```

It comes with several features out of my `development` config files, `hot-reload`, `happypack`, `auto-start server` and `dashboard` features are all integrated with some options to tune. The production environment yet comes with more powerful features, like `parallel-webpack`, `Dll`, `UglifyJsParallelPlugin`, `CopyPlugin` and some other nice features. 

All features displayed above are battle-tested, just relax and use it in your project.😊
