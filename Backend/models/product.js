const mongoose = require('mongoose');

const vendor = require('./vendor');
const Variants = require('./variant');

const productSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    vendorId: {type: mongoose.Schema.Types.ObjectId, ref: vendor, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    variants: [{type: mongoose.Schema.Types.ObjectId, ref:Variants, required: true}],
    createdOn: {type: Date, required: true, default: Date.now}
});

productSchema.pre('save', function() {
    if (!this.productId) {
        this.productId = this._id;
    }
});

const product = mongoose.model("product", productSchema);

module.exports = product;