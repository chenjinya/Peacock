/**
 * cli.js
 */
const colorful = require('../colorful');
const qomo = require("./index");

var cmdBody = process.argv.splice(2);
const cmd = cmdBody.pop();
if(!(cmd)) {
    colorful( 'command error', 'notice', true);
    colorful( 'Useage: npm run cmd "your command"  ', 'normal', true);
    colorful( 'Example: \n    npm run cmd "cat package.json | grep author"    ', 'normal', true);
    return false;
}


qomo(cmd, (err, data, counter)=>{
    console.log(colorful("[" + counter.done + "/" + counter.count+"]",'notice'),  `${data.hostname} ${data.ip}`,   err ? colorful("error", 'warning') : colorful("success", 'success'), colorful(data.cost + 'ms', 'normal'));
    if(err || data.error) { 
        err? console.log(err) : console.log(data.error);
    } else {
        console.log(data.output);
    }
})
