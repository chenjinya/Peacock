/**
 * app.js
 */
const http = require('http');
const fs = require('fs');

const router = require('./router');

const port = 8848;
const pidFile = './pid';

const server = http.createServer((req, res)=> router(req, res));

server.on('connection', (req, soc, head) => {
	// console.log("connection");
});

server.on('close', () => console.warn("Server closed"));

server.listen(port);
fs.writeFile(pidFile, process.pid, (err)=>{
	if(err) {
		console.error(err);
	} else {
		console.log(`pid ${process.pid} write in file: ${pidFile}`);
	}
});
console.log(`server is start at port: ${port} , pid is ${process.pid}`);


