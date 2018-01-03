/**
 * index.js
 */
const colorful = require('./colorful');

colorful("This program should not be loaded by module", 'notice', true);
colorful("Server use: npm run server", 'info', true);
colorful("Client use: npm run cmd \"your command\"", 'info', true);

