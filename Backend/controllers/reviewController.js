const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const reviewService = require('../services/reviewService');

const reviewController = {};

reviewController.review = async (req, res, next) => {
    try {
        await reviewService.review(req.body);
        res.status(200);
        res.json({"message": "Review added successfully"});
    }
    catch (err) {
        next(err);
    }
}

reviewController.getReviewsByProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const reviewDetails = await reviewService.getReviewsByProduct(new ObjectId(productId));
        res.status(200);
        res.json(reviewDetails);
    }
    catch (err) {
        next(err);
    }
}

reviewController.getReviewsByCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const reviewDetails = await reviewService.getReviewsByCustomer(new ObjectId(customerId));
        res.status(200);
        res.json(reviewDetails);
    }
    catch (err) {
        next(err);
    }
}

reviewController.deleteReview = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const productId = req.params.productId;
        await reviewService.deleteReview(new ObjectId(customerId), new ObjectId(productId));
        res.status(200);
        res.json({"message": "Review deleted successfully"});
    }
    catch (err) {
        next(err);
    }
}

module.exports = reviewController;