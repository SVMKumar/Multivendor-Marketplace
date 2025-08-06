const product = require('../models/product');

productValidator = {};

productValidator.findProduct = async (productId) => {
    const productDetails = await product.findOne(productId);
    if (!productDetails) {
        let err = new Error("Invalid Product");
        err.status = 404;
        throw err;
    }
}

module.exports = productValidator;