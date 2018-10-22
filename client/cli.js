/**
 * cli.js
 */
const colorful = require('../colorful');
const qomo = require("./index");

var cmdBody = process.argv.splice(2);
const cmd = cmdBody.pop();
if (!(cmd)) {
    colorful('command error', 'notice', true);
    colorful('Useage: npm run cmd "your command"  ', 'normal', true);
    colorful('Example: \n    npm run cmd "cat package.json | grep author"    ', 'normal', true);
    return false;
}


qomo(cmd, (err, data, counter, remote = {}) => {
    console.log(colorful("[" + counter.done + "/" + counter.count + "]", 'notice'), `hn:${data.hostname} ip:${data.ip} tg:${remote.tag}`, err ? colorful("error", 'warning') : colorful("success", 'success'), colorful(data.cost + 'ms', 'normal'));
    if (err || data.error) {
        console.log(colorful("ERROR", 'notice'));
        err ? console.log(err) : console.log(data.error);
    } else {
        console.log(colorful("OUTPUT", 'success'));
        console.log(data.output);
    }
})
