/**
 * test
 */

const exec = require("child_process").exec;
var execClientProcess,execServerProcess;
execServerProcess = exec('npm run server', (err, stdout, stderr) => {
    if(err || stderr) {
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Server Test fail!");
        process.exit(1);
    }
    console.log(stdout);

});
execClientProcess = exec('npm run cmd "echo success"', (err, stdout, stderr) => {
    if(err || stderr) {
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Client Test fail!");
        process.exit(1);
    } else {
        console.log(stdout);
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Test ok!");
        process.exit(0);
    }

});