const fs = require('fs');

const errorLogger = (err, req, res, next) => {
    if (err) {
        let message = new Date().toISOString() + "---" + err.message + "\n";
        fs.appendFile('errorLogger.txt', message, (err) => {
            if (err) {
                console.log("Could not log the error!!");
            }
        });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500);
        }
        res.json({"message": err.message});
        next();
    }
}

module.exports = errorLogger;