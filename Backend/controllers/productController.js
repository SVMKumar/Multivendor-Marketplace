const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const productService = require('../services/productService');

const productController = {};

productController.getProducts = async (req, res, next) => {
    try {
        const productList = await productService.getProducts();
        res.status(200);
        res.json(productList);
    }
    catch (err) {
        next(err);
    }
}

productController.getProductDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const productDetails = await productService.getProductDetails(new ObjectId(productId));
        res.status(200);
        res.json(productDetails);
    }
    catch (err) {
        next(err);
    }
}

productController.getVariantDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const variantId = req.params.variantId;
        const variantDetails = await productService.getVariantDetails(new ObjectId(productId), new ObjectId(variantId));
        res.status(200);
        res.json(variantDetails);
    }
    catch (err) {
        next(err);
    }
}

productController.getCaegories = async (req, res, next) => {
    try {
        const categoryList = await productService.getCategories();
        res.status(200);
        res.json(categoryList);
    }
    catch (err) {
        next(err);
    }
}

productController.getProductsByCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        const productList = await productService.getProductsByCategory(category);
        res.status(200);
        res.json(productList);
    }
    catch (err) {
        next(err);
    }
}

productController.getProductsBySearch = async (req, res, next) => {
    try {
        const identifier = req.params.identifier;
        const productList = await productService.getProductsBySearch(identifier);
        res.status(200);
        res.json(productList);
    }
    catch (err) {
        next(err);
    }
}

module.exports = productController;