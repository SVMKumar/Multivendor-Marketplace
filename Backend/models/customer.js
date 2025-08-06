const mongoose = require('mongoose');
const product = require('./product');
const variants = require('./variant');
const vendor = require('./vendor');

const cartSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: product},
    vendorId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: vendor},
    productName: {type: String, required: true},
    imageUrl: {type: String},
    variantId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: variants},
    quantity: {type: Number, required: true, min: 1}
});

const customerSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    dob: {type: String, required: true},
    address: {type: String, required: true},
    status: {type: String, required: true, default: 'Active'},
    password: {type: String, required: true},
    cart: {type: [cartSchema], default: [], required: true},
    joinedOn: {type: Date, required: true, default: Date.now}
});

customerSchema.pre('save', function () {
    if (!this.customerId) {
        this.customerId = this._id;
    }
});

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;