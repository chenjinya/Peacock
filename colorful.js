/**
 * app.js
 */

 module.exports = (content, color, output = false) => {
    const colors = {
        "guess" : "\033[30m",
        "notice" : "\033[31m",
        "success" : "\033[32m",
        "warning" : "\033[33m",
        "sweet" : "\033[35m",
        "info" : "\033[36m",
        "normal" : "\033[37m", 
    }

    var hi = colors[color] + content + "\033[0m";
    output && console.log(hi);
    return hi;
}
