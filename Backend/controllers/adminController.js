const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const adminService = require("../services/adminService");

const adminController = {};
const JWT_KEY = process.env.JWT_KEY;

adminController.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const adminDetails = await adminService.login(identifier, password);
        if (adminDetails) {
            const token = jwt.sign({"adminId": adminDetails.adminId, "role": "admin"}, JWT_KEY, {expiresIn: '1d'});
            res.status(200);
            res.json({
                "message": "Login Successful",
                token,
                "adminId": adminDetails.adminId,
                "name": adminDetails.name
            });
        }
    }
    catch (err) {
        next(err);
    }
}

adminController.getAdmin = async(req, res, next) => {
    try {
        const adminId = req.params.adminId;
        const adminDetails = await adminService.getAdmin(adminId);
        res.status(200);
        res.json(adminDetails);
    }
    catch (err) {
        next(err);
    }
}

adminController.getVendors = async(req, res, next) => {
    try {
        const vendors = await adminService.getVendors();
        res.status(200);
        res.json(vendors);
    }
    catch (err) {
        next(err);
    }
}

adminController.getPendingVendors = async(req, res, next) => {
    try {
        const vendors = await adminService.getPendingVendors()
        res.status(200);
        res.json(vendors);
    }
    catch (err) {
        next(err);
    }
}

adminController.getCustomers = async(req, res, next) => {
    try {
        const customers = await adminService.getCustomers();
        res.status(200);
        res.json(customers);
    }
    catch (err) {
        next(err);
    }
}

adminController.getOrders = async(req, res, next) => {
    try {
        const orders = await adminService.getOrders();
        res.status(200);
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
}

adminController.changeVendorStatus = async(req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const vendorDetails = await adminService.changeVendorStatus(new ObjectId(vendorId), req.body.status);
        res.status(200);
        res.json(vendorDetails);
    }
    catch (err) {
        next(err);
    }
}

module.exports = adminController;