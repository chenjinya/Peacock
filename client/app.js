/**
 * app.js
 */
const querystring = require('querystring');
const os = require('os');
const uuidV4 = require('uuid/v4');
const targets = require('./targets');
const request = require('./request');
const colorful = require('../colorful');

var cmdBody = process.argv.splice(2);
var cmd = cmdBody.pop();
if(!(cmd)) {
    colorful( 'command error', 'notice', true);
    colorful( 'Useage: command [param];', 'normal', true);
    colorful( 'Example: \n      ls -lat /', 'normal', true);
    return false;
}


var commandStructure = cmd.split(" ");
var command = commandStructure.shift();
var commandArgs = commandStructure;
const query = querystring.stringify({
    'param': JSON.stringify({
        'command': command,
        'args' : commandArgs,
    })
});

var counter = {
    count: targets.length,
    done: 0,
    error: 0,
};

//use same request id
const requestId = uuidV4()
console.log("Request Id:", colorful(requestId, 'info'));
for(ip of targets) {
    request({
        hostname: ip,
        port: 8848,
        path: '/cmd?' + query,
        method: 'GET',
        headers: {
            'x-request-id' : requestId,
        }
    }, (err, data)=>{
        if(err || data.error) {
            counter.error ++;
            counter.done ++;
            console.log(colorful("[" + counter.done + "/" + counter.count+"]",'notice'),  `${data.hostname} ${data.ip}  `,   colorful("error", 'warning'), colorful(data.cost + 'ms', 'normal'));
            err ? console.log(err) : console.log(data.error);
        }  else {
            counter.done ++;
            console.log(colorful("[" + counter.done + "/" + counter.count+"]", 'notice'), `${data.hostname} ${data.ip}  `,  colorful("success", 'success'), colorful(data.cost + 'ms', 'normal'));
            console.log(data.output);
        }
        
    });
    
}
