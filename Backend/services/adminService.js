const vendor = require('../models/vendor');
const customer = require('../models/customer');
const order = require('../models/order');
const admin = require('../models/admin');
const vendorValidator = require('../utilities/vendorValidator');
const adminValaditor = require('../utilities/adminValidator');

const adminService = {};

adminService.login = async (identifier, password) => {
    try {
        const adminDetails = await adminValaditor.checkForLogin(identifier);
        if (await passwordMatcher(password, adminDetails.password)) {
            return adminDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

adminService.getAdmin = async (adminId) => {
    try {
        const adminDetails = await admin.findOne({"adminId": adminId})
        if (adminDetails) {
            return adminDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

adminService.getVendors = async () => {
    try {
        const vendors = await vendor.find({}, {password: 0});
        return vendors;
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

adminService.getPendingVendors = async () => {
    try {
        const vendors = await vendor.find({status: "Pending"}, {password: 0});
        return vendors;
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

adminService.getCustomers = async () => {
    try {
        const customers = await customer.find({}, {password: 0});
        return customers;
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

adminService.getOrders = async () => {
    try {
        const orders = await order.find();
        return orders;
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

adminService.changeVendorStatus = async (vendorId, status) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const vendorDetails = await vendor.findOneAndUpdate({"vendorId": vendorId}, {$set: {"status": status}}, {new: true, runValidations: true, select: '-password'});
        return vendorDetails;
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

module.exports = adminService;