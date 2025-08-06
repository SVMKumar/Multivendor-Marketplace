const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.post('/auth/customer-signup', customerController.signUp);

router.post('/auth/customer-login', customerController.login);

router.get('/customers/:customerId', customerController.getCustomer);

router.patch('/customers/:customerId', customerController.updateCustomer);

router.delete('/customers/:customerId', customerController.deleteCustomer);

router.get('/customers/:customerId/cart', customerController.getCart);

router.patch('/customers/:customerId/cart/:productId/:variantId', customerController.updateQuantity);

router.post('/customers/:customerId/cart', customerController.addProduct);

router.delete('/customers/:customerId/cart/:productId/:variantId', customerController.deleteProduct);

module.exports = router;