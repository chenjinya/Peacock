/**
 * remotes.js
 */
let remotes = [
    {
        host: '127.0.0.1',
        tag: 'local'
    }
];
module.exports = {
    get: function () {
        return remotes;
    },
    set: function (_r) {
        return remotes = _r;
    }
}