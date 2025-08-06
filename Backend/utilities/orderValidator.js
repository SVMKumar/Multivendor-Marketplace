const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const order = require('../models/order');
const variant = require('../models/variant');

orderValidator = {};

orderValidator.findOrder = async (orderId) => {
    const orderDetails = await order.findOne(orderId);
    if (!orderDetails) {
        let err = new Error("Invalid Order");
        err.status = 404;
        throw err;
    }
}

orderValidator.manageQuantity = async (orderDetails) => {
    for (let i = 0; i < orderDetails.products.length; i++) {
        const variantId = new ObjectId(orderDetails.products[i].variantId);
        const quantity = orderDetails.products[i].quantity;
        const variantDeatails = await variant.findOne({"_id": variantId}, {"stock": 1, "_id": 0});
        if (quantity > variantDeatails.stock) {
            let err = new Error("Cannot place your order due to quantity!!");
            err.status = 400;
            throw err;
        }
    }
    for (let i = 0; i < orderDetails.products.length; i++) {
        const variantId = new ObjectId(orderDetails.products[i].variantId);
        const quantity = Number(orderDetails.products[i].quantity);
        await variant.findOneAndUpdate({"_id": variantId}, {$inc: {"stock": -quantity}});
    }
}

module.exports = orderValidator;