const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

router.post('/reviews', reviewController.review);

router.get('/reviews/products/:productId', reviewController.getReviewsByProduct);

router.get('/reviews/customers/:customerId', reviewController.getReviewsByCustomer);

router.get('/reviews/:customerId/:productId', reviewController.deleteReview);

module.exports = router;