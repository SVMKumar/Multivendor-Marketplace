const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const orderService = require('../services/orderService');

const orderController = {};

orderController.order = async (req, res, next) => {
    try {
        await orderService.order(req.body);
        res.status(200);
        res.json({"message": "Order Placed Successfully"});
    }
    catch (err) {
        next(err);
    }
}

orderController.getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const orderDetails = await orderService.getOrder(new ObjectId(orderId));
        res.status(200);
        res.json(orderDetails);
    }
    catch (err) {
        next(err);
    }
}

orderController.getOrdersByCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const ordersList = await orderService.getOrdersByCustomer(new ObjectId(customerId));
        res.status(200);
        res.json(ordersList);
    }
    catch (err) {
        next(err);
    }
}

orderController.setOrderStatus  = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const variantId = req.params.variantId;
        const orderDetails = await orderService.setOrderStatus(new ObjectId(orderId), new ObjectId(variantId), req.body.orderStatus);
        res.status(200);
        res.json(orderDetails);
    }
    catch (err) {
        next(err);
    }
}

orderController.getOrdersByVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const orderDetails = await orderService.getOrdersByVendor(new ObjectId(vendorId));
        res.status(200);
        res.json(orderDetails);
    }
    catch (err) {
        next(err);
    }
}

orderController.getPendingOrdersByVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId;
        const orderDetails = await orderService.getPendingOrdersByVendor(new ObjectId(vendorId));
        res.status(200);
        res.json(orderDetails);
    }
    catch (err) {
        next(err);
    }
}

orderController.getTopVendors = async (req, res, next) => {
    try {
        const topVendors = await orderService.getTopVendors();
        res.status(200);
        res.json(topVendors);
    }
    catch (err) {
        next(err);
    }
}

orderController.getTopProducts = async (req, res, next) => {
    try {
        const topProducts = await orderService.getTopProducts();
        res.status(200);
        res.json(topProducts);
    }
    catch (err) {
        next(err);
    }
}

module.exports = orderController;