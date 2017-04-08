var run = require('parallel-webpack').run,
    configPath = require.resolve('./webpack.config.js');



run(configPath, {
    watch: false,
    // silent: true,
    maxRetries: 1,
    stats: false, // defaults to false
    maxConcurrentWorkers: 4 // use 2 workers
});

