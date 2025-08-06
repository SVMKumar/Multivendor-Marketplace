const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/orders', orderController.order);

router.get('/orders/:orderId', orderController.getOrder);

router.get('/customers/:customerId/orders', orderController.getOrdersByCustomer);

router.get('/vendors/:vendorId/orders', orderController.getOrdersByVendor);

router.get('/vendors/:vendorId/pending-orders', orderController.getPendingOrdersByVendor);

router.get('/orders/vendors/top-vendors', orderController.getTopVendors);

router.get('/orders/products/top-products', orderController.getTopProducts);

router.patch('/orders/:orderId/status/:variantId', orderController.setOrderStatus);

module.exports = router;