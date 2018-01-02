/**
 * app.js
 */
const http = require('http');
const fs = require('fs');

const router = require('./router');

const server = http.createServer((req, res)=> router(req, res));


server.on('connection', (req, soc, head) => {
	// console.log("connection");
});

server.on('close', () => console.warn("Server closed"));
const port = 8848;
server.listen(port);
console.log(`server is start at port: ${port} , pid is ${process.pid}`);


