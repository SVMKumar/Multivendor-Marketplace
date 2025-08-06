const fs = require('fs');

const requestLogger = (req, res, next) => {
    let message = new Date().toISOString() + "---" + req.method + " " + req.url + "\n";
    fs.appendFile('requestLogger.txt', message, (err) => {
        if(err) {
            return next(err);
        }
    });
    next();
}

module.exports = requestLogger;