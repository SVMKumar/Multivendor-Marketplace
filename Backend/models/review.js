const mongoose = require('mongoose');

const customer = require('./customer');
const product = require('./product');

const reviewSchema = new mongoose.Schema({
    customerId: {type: mongoose.Types.ObjectId, required: true, ref: customer},
    productId: {type: mongoose.Types.ObjectId, required: true, ref: product},
    rating: {type: Number, required: true},
    review: {type: String, required: true},
    createdOn: {type: Date, required: true, default: Date.now}
});

const review = mongoose.model('review', reviewSchema);

module.exports = review;