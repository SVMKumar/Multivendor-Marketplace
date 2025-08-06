const mongoose = require('mongoose');

const customer = require('./customer');
const product = require('./product');
const variants = require('./variant');
const vendor = require('./vendor');

const cartSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: product},
    vendorId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: vendor},
    name: {type: String, required: true},
    orderStatus: {type: String, enum: ['Pending', 'Completed', 'Cancelled'], required: true, default: 'Pending'},
    imageUrl: {type: String},
    variantId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: variants},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, min: 1}
});

const orderSchema = new mongoose.Schema({
    orderId: {type: mongoose.Schema.Types.ObjectId},
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: customer, required: true},
    totalAmount: {type: Number, required: true},
    deliveryAddress: {type: String, required: true},
    orderDate: {type: Date, required: true, default: Date.now},
    products: {type: [cartSchema], required: true}
});

orderSchema.pre('save', function () {
    if (! this.orderId) {
        this.orderId = this._id;
    }
});

const order = mongoose.model('order', orderSchema);

module.exports = order;