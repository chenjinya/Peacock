/**
 * router
 */
const cmd = require('./cmd');
const url = require('url');
const querystring = require('querystring');
const colorful = require('../colorful');

const pong = (res, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
}
const ok = (res, data = 'ok') => {
    pong(res, data);
}
const nok = (res, errmsg = 'error') => {
    pong(res, errmsg);
}
const notfound = (res) => {
    res.statusCode = 404;
    res.end();
}
const Router = (req, res) => {

    const urlParse = url.parse(req.headers.host + req.url);
    const queryParam = querystring.parse(urlParse.query);

    const requestId = req.headers['x-request-id'];
    console.log("Request Id:", colorful(requestId, 'info'));
    console.log(queryParam);

    if (urlParse.pathname !== '/cmd') {
        notfound(res);
        return true;
    }
    try {
        const json = JSON.parse(queryParam.param);
        if (json.command && json.args) {
            cmd(json.command, json.args, {
                timeout: 10000,
                id: requestId,
            }, (err, data) => {
                if (err) {
                    console.error(err.message);
                }
                ok(res, JSON.stringify(data));
            });
        } else {
            nok(res, 'Param error');
        }
    } catch (e) {
        console.error(e);
        nok(res, 'Server Exception');
    }
    return true;


}

module.exports = Router;
