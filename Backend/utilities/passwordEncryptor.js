const bcrypt = require('bcryptjs');
const rounds = 10;

passwordEncryptor = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, rounds);
        return hashedPassword;
    }
    catch(e) {
        let err = new Error("Password hashing Failed");
        err.status = 500;
        throw err;
    }
}

module.exports = passwordEncryptor;