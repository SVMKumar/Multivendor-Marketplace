const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const vendorService = require('../services/vendorService');
const vendorValidator = require('../utilities/vendorValidator');
const passwordEncryptor = require('../utilities/passwordEncryptor');
const vendor = require('../models/vendor');
const product = require('../models/product');
const Variants = require('../models/variant');

const vendorController = {};
const JWT_KEY = process.env.JWT_KEY;

vendorController.signUp = async (req, res, next) => {
    try {
        const { name, storeName, email, phone, address, password, paymentMethods } = req.body;
        const hashedPassword = await passwordEncryptor(password);
        const newVendor = new vendor({ name, storeName, email, phone, address, password, paymentMethods });
        newVendor.password = hashedPassword;
        await vendorService.signUp(newVendor);
        res.status(201);
        res.json({"message": "Vendor registered successfully. Wait for admin approval."});
    }
    catch (err) {
        next(err);
    }
}

vendorController.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const vendorDetails = await vendorService.login(identifier, password);
        if (vendorDetails) {
            const token = jwt.sign({"vendorId": vendorDetails.vendorId, "role": "vendor"}, JWT_KEY, {expiresIn: '1d'});
            res.status(200);
            res.json({
                "message": "Login Successful",
                token,
                "vendorId": vendorDetails.vendorId,
                "name": vendorDetails.name,
                "status": vendorDetails.status
            });
        }
    }
    catch (err) {
        next(err);
    }
}

vendorController.getVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const vendorDetails = await vendorService.getVendor(new ObjectId(vendorId));
        res.status(201);
        res.json(vendorDetails);
    }
    catch (err) {
        next(err);
    }
}

vendorController.updateVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const vendorDetails = await vendorService.updateVendor(new ObjectId(vendorId), req.body);
        res.status(201);
        res.json(vendorDetails);
    }
    catch (err) {
        next(err);
    }
}

vendorController.deleteVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        await vendorService.deleteVendor(new ObjectId(vendorId));
        res.status(200);
        res.json({"message": "Vendor deleted successfully"});
    }
    catch (err) {
        next(err);
    }
}

vendorController.addProduct = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        let { name, description, category, imageUrl, variants } = req.body;
        await vendorValidator.findVendor(new ObjectId(vendorId));
        const addedVariants = await Variants.insertMany(variants);
        variants = addedVariants.map(av => av._id);
        const productDetails = new product({ vendorId, name, description, category, imageUrl, variants });
        const addedProduct = await vendorService.addProduct(productDetails);
        if (addedProduct) {
            res.status(200);
            res.json({"message": "Product added successfully"});
        }
    }
    catch (err) {
        next(err);
    }
}

vendorController.getProducts = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const productsList = await vendorService.getProducts(new ObjectId(vendorId));
            if (productsList) {
                res.status(200);
                res.json(productsList);
            }
    }
    catch (err) {
        next(err);
    }
}

vendorController.deleteProduct = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const productId = req.params.productId;
        const deletedProducts = await vendorService.deleteProduct(new ObjectId(vendorId), new ObjectId(productId));
        for (let i = 0; i < deletedProducts.variants.length; i++) {
            await Variants.deleteMany({"_id": new ObjectId(deletedProducts[i])});
        }
        res.status(200);
        res.json({"message": "Product deleted successfully"});

    }
    catch (err) {
        next(err);
    }
}

vendorController.getOutstandingPayment = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const outstandingPayment = await vendorService.getOutstandingPayment(new ObjectId(vendorId));
        if (outstandingPayment) {
            res.json(outstandingPayment);
        }
    }
    catch (err) {
        next(err);
    }
}

vendorController.getPaymentMethods = async (req,res,next) => {
    try{
        const vendorId = req.params.vendorId;
        const paymentDetails = await vendorService.getPaymentMethods(new ObjectId(vendorId));
        if(paymentDetails){
            res.status(200);
            res.send(paymentDetails);
        }
    } 
    catch (err) {
        next(err);
    }
}

vendorController.addPaymentMethods = async (req,res,next) => {
    try{

        const vendorId = req.params.vendorId;
        const addedPaymentMethodDetails = await vendorService.addPaymentMethods(new ObjectId(vendorId),req.body);
        if(addedPaymentMethodDetails){
            res.status(200);
            res.json(addedPaymentMethodDetails);
        }
    }
    catch (err) {
        next(err);
    }
}

vendorController.deletePaymentMethods= async(req,res,next)=>{
    try{
        const vendorId=req.params.vendorId;
        const deletedPaymentMethodDetails = await vendorService.deletePaymentMethods(new ObjectId(vendorId),req.body);
        if(deletedPaymentMethodDetails){
            res.status(200);
            res.json(deletedPaymentMethodDetails);
        }
    }
    catch (err){
        next(err);
    }
}

vendorController.getStats = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const stats = await vendorService.getStats(new ObjectId(vendorId));
        if (stats) {
            res.json(stats);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = vendorController;