var cp = require('child_process');


function run (scriptName) {
    var child = cp.spawn('npm', ['run', scriptName]);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}