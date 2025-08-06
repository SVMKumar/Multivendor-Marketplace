const customer = require('../models/customer');
const customerValidator = require('../utilities/customerValidator');
const productValidator = require('../utilities/productValidator');
const variantValidator = require('../utilities/variantValidator');
const passwordMatcher = require('../utilities/passwordMatcher');

const customerService = {};

customerService.signUp = async (newCustomer) => {
    try {
        await customerValidator.findEmail(newCustomer.email);
        await customerValidator.findPhone(newCustomer.phone);
        try {
            const customerDetails = await customer.insertOne(newCustomer);
            return customerDetails;
        }
        catch (e) {
            let error = new Error("Invalid request body");
            error.status = 400;
            throw error;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.login = async (identifier, password) => {
    try {
        const customerDetails = await customerValidator.checkForLogin(identifier);
        if (await passwordMatcher(password, customerDetails.password)) {
            return customerDetails;
        }
    }
    catch (err) {
        throw err
    }
}

customerService.getCustomer = async (customerId) => {
    try {
        await customerValidator.findCustomer(customerId);
        const customerDetails = await customer.findOne({"customerId": customerId}, {"password": 0});
        if (customerDetails) {
            return customerDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.updateCustomer = async (customerId, updatedDetails) => {
    try {
        await customerValidator.findCustomer(customerId);
        const customerDetails = await customer.findOneAndUpdate({"customerId": customerId}, {$set: updatedDetails}, {new: true, runValidations: true, select: '-password'});
        if (customerDetails) {
            return customerDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.deleteCustomer = async (customerId) => {
    try {
        await customerValidator.findCustomer(customerId);
        const customerDetails = await customer.findOneAndDelete({"customerId": customerId});
        if (customerDetails) {
            return customerDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.getCart = async (customerId) => {
    try {
        await customerValidator.findCustomer(customerId);
        const cartItems = await customer.findOne({"customerId": customerId}, {cart: 1, _id: 0, address: 1});
        let customerCart = {};
        customerCart.customerId = customerId;
        customerCart.cart = cartItems.cart;
        customerCart.address = cartItems.address;
        if (customerCart) {
            return customerCart;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.addProduct = async (customerId, productDetails) => {
    try {
        await customerValidator.findCustomer(customerId);
        await productValidator.findProduct(productDetails.productId);
        await variantValidator.findVariant(productDetails.variantId);
        const updatedCart = await customer.findOneAndUpdate({"customerId": customerId}, {$push: {"cart": productDetails}});
        if (updatedCart) {
            return updatedCart;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.updateQuantity = async (customerId, productId, variantId, value) => {
    try {
        await customerValidator.findCustomer(customerId);
        await productValidator.findProduct(productId);
        await variantValidator.findVariant(variantId);
        const productDetails = await customer.findOneAndUpdate({"customerId": customerId, "cart.productId": productId, "cart.variantId": variantId}, { $inc: {"cart.$.quantity": value}}, {new: true});
        if (productDetails) {
            return productDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

customerService.deleteProduct = async (customerId, productId, variantId) => {
    try {
        await customerValidator.findCustomer(customerId);
        await productValidator.findProduct(productId);
        await variantValidator.findVariant(variantId);
        const productDetails = await customer.findOneAndUpdate({"customerId": customerId}, {$pull: {"cart": {"productId": productId, "variantId": variantId}}});
        if (productDetails) {
            return productDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

module.exports = customerService;