const variant = require('../models/variant');

variantValidator = {};

variantValidator.findVariant = async (variantId) => {
    const variantDetails = await variant.findOne(variantId);
    if (!variantDetails) {
        let err = new Error("Invalid Variant");
        err.status = 404;
        throw err;
    }
}

module.exports = variantValidator;