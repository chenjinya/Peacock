/**
 * index.js
 */

const target = require('./remotes');
const command = require('./command');

module.exports = {
  remote: target,
  command: command,
}