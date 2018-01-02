/**
 * request.js
 */
const http = require('http');
const os = require('os');

module.exports = (options, callback)=>{


    var headers = options.headers ? options.headers: {};
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/x-www-form-urlencoded';
    // headrs['Content-Length'] = Buffer.byteLength(query);
    headers['x-request-id'] = headers['x-request-id'] ? headers['x-request-id'] : os.hostname() + Date.now()
    options = {
        hostname: options.hostname,
        port: options.port,
        path: options.path,
        method: options.method ? options.method : 'GET',
        headers: headers
    };

    const request = http.request(options, (res) => {
        res.setEncoding('utf8');
        var resData = '';
        res.on('data', (chunk) => {
            resData += chunk;
        });
        res.on('end', () => {
            try{
                var jsonData = JSON.parse(resData);
                callback && callback(false, jsonData);
            } catch(e) {
                callback && callback(e.message, resData);
                console.error(resData);

            }
        });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    request.end();
    return true;
}
