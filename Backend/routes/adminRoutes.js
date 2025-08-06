const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post('/auth/admin-login', adminController.login);

router.get('/admin/pending-vendors', adminController.getPendingVendors);

router.get('/admin/vendors', adminController.getVendors);

router.get('/admin/customers', adminController.getCustomers);

router.get('/admin/orders', adminController.getOrders);

router.get('/admin/:adminId', adminController.getAdmin);

router.patch('/admin/:vendorId/status', adminController.changeVendorStatus);

module.exports = router;