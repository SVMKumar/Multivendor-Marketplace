const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const customerService = require('../services/customerService');
const passwordEncryptor = require('../utilities/passwordEncryptor');

const customer = require('../models/customer');

const customerController = {};
const JWT_KEY = process.env.JWT_KEY;

customerController.signUp = async (req, res, next) => {
    try {
        const { name, email, phone, dob, address, password } = req.body;
        const hashedPassword = await passwordEncryptor(password);
        const newCustomer = new customer({ name, email, phone, dob, address, password });
        newCustomer.password = hashedPassword;
        await customerService.signUp(newCustomer);
        res.status(201);
        res.json({"message": "Customer registered successfully. Redirecting to login Page."});
    }
    catch (err) {
        next(err);
    }
}

customerController.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const customerDetails = await customerService.login(identifier, password);
        if (customerDetails) {
            const token = jwt.sign({"customerId": customerDetails.customerId, "role": "customer"}, JWT_KEY, {expiresIn: '1d'});
            res.status(200);
            res.json({
                "message": "Login Successful",
                token,
                "customerId": customerDetails.customerId,
                "customerName": customerDetails.name
            });
        }
    }
    catch (err) {
        next(err);
    }
}

customerController.getCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const customerDetails = await customerService.getCustomer(new ObjectId(customerId));
        res.status(200);
        res.json(customerDetails);
    }
    catch (err) {
        next(err);
    }
}

customerController.updateCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const customerDetails = await customerService.updateCustomer(new ObjectId(customerId), req.body);
        res.status(200);
        res.json(customerDetails);
    }
    catch (err) {
        next(err);
    }
}

customerController.deleteCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        await customerService.deleteCustomer(new ObjectId(customerId));
        res.status(200);
        res.json({"message": "Customer deleted successfully"});
    }
    catch (err) {
        next(err);
    }
}

customerController.getCart = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const cartItems = await customerService.getCart(new ObjectId(customerId));
        res.status(200);
        res.json(cartItems);
    }
    catch (err) {
        next(err);
    }
}

customerController.addProduct = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const { productId, productName, variantId, imageUrl, quantity, vendorId } = req.body;
        let productDetails = {};
        productDetails.productId = new ObjectId(productId);
        productDetails.variantId = new ObjectId(variantId);
        productDetails.vendorId = new ObjectId(vendorId);
        productDetails.productName = productName;
        productDetails.imageUrl = imageUrl;
        productDetails.quantity = quantity;
        await customerService.addProduct(new ObjectId(customerId), productDetails);
        res.status(200);
        res.json({"message": "Product added successfully"});
    }
    catch (err) {
        next(err);
    }
}

customerController.updateQuantity = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const productId = req.params.productId;
        const variantId = req.params.variantId;
        await customerService.updateQuantity(new ObjectId(customerId), new ObjectId(productId), new ObjectId(variantId), req.body.value);
        res.status(200);
        res.json({"message": "Updated Successfully"});
    }
    catch (err) {
        next (err);
    }
}

customerController.deleteProduct = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const productId = req.params.productId;
        const variantId = req.params.variantId;
        await customerService.deleteProduct(new ObjectId(customerId), new ObjectId(productId), new ObjectId(variantId));
        res.status(200);
        res.json({"message": "Product deleted successfully"});
    }
    catch (err) {
        next(err);
    }
}

module.exports = customerController;