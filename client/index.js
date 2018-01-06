/**
 * index.js
 */
const querystring = require('querystring');
const uuidV4 = require('uuid/v4');
const remotes = require('./remotes');
const request = require('./request');
const colorful = require('../colorful');

module.exports = function (cmd, callback){

    var commandStructure = cmd.split(" ");
    const command = commandStructure.shift();
    const commandArgs = commandStructure;
    const query = querystring.stringify({
        'param': JSON.stringify({
            'command': command,
            'args' : commandArgs,
        })
    });
    
    var counter = {
        count: remotes.length,
        done: 0,
        error: 0,
    };
    
    //use same request id
    const requestId = uuidV4()
    console.log("Request Id:", colorful(requestId, 'info'));
    for(ip of remotes) {
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
                callback && callback(err, data, counter);
            }  else {
                counter.done ++;
                callback && callback(false, data, counter);
            }
            
        });
        
    }
    
}
