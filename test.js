/**
 * test
 */

const exec = require("child_process").exec;
const execServerProcess = exec('npm run server', (err, stdout, stderr) => {
    if(err || stderr) {
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Test fail!");
        process.exit(1);
    }
    console.log(stdout);

});
const execClientProcess = exec('npm run cmd "echo success"', (err, stdout, stderr) => {
    if(err || stderr) {
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Test fail!");
        process.exit(1);
    }
    if(stdout) {
        console.log(stdout);
        execClientProcess && execClientProcess.kill();
        execServerProcess && execServerProcess.kill();
        console.log("Test ok!");
        process.exit(0);
    }

});