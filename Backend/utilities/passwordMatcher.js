const bcrypt = require('bcryptjs');

passwordMatcher = async (password, hashedPassword) => {
    try {
        const matched = await bcrypt.compare(password, hashedPassword);
        if (matched) {
            return true;
        }
        else {
            let err = new Error("Invalid Credentials");
            err.status = 401;
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
}

module.exports = passwordMatcher;