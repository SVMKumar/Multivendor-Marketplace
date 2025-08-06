const admin = require('../models/admin');

const adminValidator = {};

adminValidator.checkForLogin = async (identifier) => {
    const adminDetails = await admin.findOne({
        $or: [{"email": identifier}, {"phone": identifier}]
    });
    if (! adminDetails) {
        let err = new Error("Invalid Credentials");
        err.status = 401;
        throw err;
    }
    return adminDetails;
}

module.exports = adminValidator;