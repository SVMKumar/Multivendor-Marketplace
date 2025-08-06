const vendor = require('../models/vendor');

vendorValidator = {};

vendorValidator.findEmail = async (email) => {
    const emailFound = await vendor.findOne({"email": email});
    if (emailFound) {
        let err = new Error("Email already exists");
        err.status = 409;
        throw err;
    }
}

vendorValidator.findPhone = async (phone) => {
    const phoneFound = await vendor.findOne({"phone": phone});
    if (phoneFound) {
        let err = new Error("Mobile Number already exists");
        err.status = 409;
        throw err;
    }
}

vendorValidator.findVendor = async (vendorId) => {
    const vendorDetails = await vendor.findOne({"vendorId": vendorId});
    if (!vendorDetails) {
        let err = new Error("Invalid Vendor");
        err.status = 404;
        throw err;
    }
}

vendorValidator.checkForLogin = async (identifier) => {
    const vendorDetails = await vendor.findOne({
        $or: [{"email": identifier}, {"phone": identifier}]
    });
    if (! vendorDetails) {
        let err = new Error("Invalid Credentials");
        err.status = 401;
        throw err;
    }
    return vendorDetails;
}

module.exports = vendorValidator;