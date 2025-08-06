const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendorController');

router.post('/auth/vendor-signup', vendorController.signUp);

router.post('/auth/vendor-login', vendorController.login);

router.get('/vendors/:vendorId', vendorController.getVendor);

router.patch('/vendors/:vendorId', vendorController.updateVendor);

router.delete('/vendors/:vendorId', vendorController.deleteVendor);

router.post('/vendors/:vendorId/products', vendorController.addProduct);

router.get('/vendors/:vendorId/products', vendorController.getProducts);

router.get('/vendors/:vendorId/outstanding-payments', vendorController.getOutstandingPayment);

router.delete('/vendors/:vendorId/products/:productId', vendorController.deleteProduct);

router.get('/vendors/:vendorId/payment-methods',vendorController.getPaymentMethods);

router.patch('/vendors/:vendorId/payment-methods',vendorController.addPaymentMethods);

router.patch('/vendors/:vendorId/delete-payment-methods',vendorController.deletePaymentMethods);

router.get('/vendors/:vendorId/stats', vendorController.getStats);

module.exports = router;