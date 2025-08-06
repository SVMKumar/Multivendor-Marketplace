const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);

router.get('/products/:productId', productController.getProductDetails);

router.get('/products/:productId/variants/:variantId', productController.getVariantDetails);

router.get('/categories', productController.getCaegories);

router.get('/categories/:category', productController.getProductsByCategory);

router.get('/products/search/:identifier', productController.getProductsBySearch);

module.exports = router;