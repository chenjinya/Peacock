# ShotGun

A tiny cluster command execution tool via nodejs.

# Node Version
 >=  v6.10.1(lower version may work well, I didn't test)
# Install
npm install

# Develop

npm run dev-server

# Start

## Server side
npm run server

## Client side
```
npm run client "cat package.json | grep author"
```
**output**
```
Request Id: 72ff367f-7aaf-40e4-8689-8ad2c2337935
[1/2] chenjinyadeMacBook-Pro.local 192.168.11.1   success 20ms
  "author": "Jinya Chen",

[2/2] chenjinyadeMacBook-Pro.local 192.168.11.1   success 15ms
  "author": "Jinya Chen",
```

