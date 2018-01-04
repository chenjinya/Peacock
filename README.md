# Qomolangma 珠穆朗玛

<div align=center>
<img width="200" height="200" src="./dustbin/logo.png" alt="logo"/>
<p>
Qomolangma is a small and beautiful cluster command execute tool via nodejs.

</p>
<p>一览众山小</p>
</div>

[![Build Status](https://travis-ci.org/chenjinya/Qomolangma.svg?branch=master)](https://travis-ci.org/chenjinya/Qomolangma)

# Node Version
 `>=6.0`
 
# Install
```
npm install
```

# Dev
```
npm run dev-server
```

# Start

## Server side
```
npm run server
```

It will create a server by current linux user.The server is waiting for command request.

### Use PM2
```
pm2 start ecosystem.config.js
```

### Use PM2 deploy
*edit `ecosystem.config.js` properly firstly
```
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production
```

## Client side
```
npm run cmd "cat package.json | grep author"
```

It will send a request to server for executing the command and the server will response the command stdout.

**output**

```
Request Id: 72ff367f-7aaf-40e4-8689-8ad2c2337935
[1/1] chenjinyadeMacBook-Pro.local 192.168.11.1   success 20ms
  "author": "Jinya Chen",
```

**info**
```
|done / total |           hostname          |     ip       |  status | cost|
[  1    /  1  ] chenjinyadeMacBook-Pro.local  192.168.11.1   success   15ms
  "author": "Jinya Chen",
| command     stdout    |
```

## Config
Before running, you should config IPs in `client/targets.js`.

Default server http port is `8848`. (The height of the Mount Qomolangma is 8848 meters)
## Test
```
npm test
```

The test will create a server and try to execute a cmd. If it processing well, test script will show 'Test ok' and exit 0.

## Warning 

It's so **DANGER** when you run this program by **ROOT** user.In most case, you should forbidden outside network access for securit.

