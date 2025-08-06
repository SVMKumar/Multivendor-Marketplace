const customer = require('../models/customer');

customerValidator = {};

customerValidator.findEmail = async (email) => {
    const emailFound = await customer.findOne({"email": email});
    if (emailFound) {
        let err = new Error("Email already exists");
        err.status = 409;
        throw err;
    }
}

customerValidator.findPhone = async (phone) => {
    const phoneFound = await customer.findOne({"phone": phone});
    if (phoneFound) {
        let err = new Error("Mobile Number already exists");
        err.status = 409;
        throw err;
    }
}

customerValidator.findCustomer = async (customerId) => {
    const customerDetails = await customer.findOne({"customerId": customerId});
    if (!customerDetails) {
        let err = new Error("Invalid Customer");
        err.status = 404;
        throw err;
    }
}

customerValidator.checkForLogin = async (identifier) => {
    const customerDetails = await customer.findOne({
        $or: [{"email": identifier}, {"phone": identifier}]
    });
    if (!customerDetails) {
        let err = new Error("Invalid Credentials");
        err.status = 401;
        throw err;
    }
    return customerDetails;
}

module.exports = customerValidator;