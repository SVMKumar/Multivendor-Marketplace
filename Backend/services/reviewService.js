const review = require('../models/review');
const productValidator = require('../utilities/productValidator');
const customerValidator = require("../utilities/customerValidator");

const reviewService = {};

reviewService.review = async (reviewObj) => {
    try {
        const reviewDetails = await review.insertOne(reviewObj);
        if (reviewDetails) {
            return reviewDetails;
        }
    }
    catch (err) {
        let error = new Error("Internal Server Error");
        error.status = 500;
        throw error;
    }
}

reviewService.getReviewsByProduct = async (productId) => {
    try {
      await productValidator.findProduct(productId);
  
      const reviewDetails = await review.aggregate([
        {
          $match: { productId: productId }
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer"
          }
        },
        { $unwind: "$customer" },
        {
          $project: {
            _id: 1,
            productId: 1,
            customerId: 1,
            rating: 1,
            review: 1,
            createdAt: 1,
            customerName: "$customer.name"
          }
        }
      ]);
  
      return reviewDetails;
    } catch (err) {
      throw err;
    }
  };
  
  

reviewService.getReviewsByCustomer = async (customerId) => {
    try {
        await customerValidator.findCustomer(customerId);
        const reviewDetails = await review.find({"customerId": customerId});
        if (reviewDetails) {
            return reviewDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

reviewService.deleteReview = async (customerId, productId) => {
    try {
        await customerValidator.findCustomer(customerId);
        await productValidator.findProduct(productId);
        const reviewDetails = await review.findOneAndDelete({"customerId": customerId, "productId": productId});
        if (reviewDetails) {
            return reviewDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

module.exports = reviewService;