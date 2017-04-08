# webpack-config
My own webpack configure with [happypack](https://github.com/amireh/happypack), [birdv3](https://www.npmjs.com/package/birdv3), webpack hot-server & etc.

## Features
It comes with several webpack features out of box, it includes `hot-reload`, `happypack`, `auto-start server` and `dashboard` features in  `development` environment with some options to tune. The production environment comes with more powerful features, like `parallel-webpack`, `Dll`, `UglifyJsParallelPlugin`, `CopyPlugin` and some other nice features. 

All features above are battle-tested, just relax and use it in your project.😊

## Usage
The `build` folder nearly includes all config files of this repo, the environment of `development` and `production` is distinguished. Bascically, `webpack.config.js`, `webpack.dev.config.js` are the entries of the two distinguished environment, you should go check them out. Use the tool kit with following commands: 

```sh
>> npm start
>> npm run dev:env1
>> npm run build
```

