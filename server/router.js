/**
 * router
 */
const cmd = require('./cmd');
const url = require('url');
const querystring = require('querystring');
const colorful = require('../colorful');

var pong = (res, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
}
var ok = (res, data = 'ok') => {
    pong(res, data);
}
var nok = (res, errmsg = 'error') => {
    pong(res, errmsg);
}

var Router = (req, res)=>{

    var urlParse = url.parse(req.headers.host + req.url);
    var queryParam = querystring.parse(urlParse.query);

    var requestId = req.headers['x-request-id'];
    console.log("Request Id:", colorful(requestId, 'info'));
    console.log(queryParam);

    if(urlParse.pathname !== '/cmd') {
        res.statusCode = 404;
        res.end();
        return true;
    }
    try {
        var json = JSON.parse(queryParam.param);
        if(json.command && json.args) {
            cmd(json.command, json.args, {
                timeout: 10000,
                id: requestId,
            }, (err, data)=>{
                if(err) {
                    let errmsg = typeof err == 'string' ? err :  err.message ? err.message :  JSON.stringify(err);
                    console.error(errmsg);
                    if(data) {
                        data.error = errmsg; 
                    }
                    
                } 
                ok(res, JSON.stringify(data));
            });
        } else {
            nok(res,'Param error');
        }
    } catch( e){
        console.error(e);
        nok(res,'Server Exception');
    }
    return true;
    
    
}

module.exports = Router;
