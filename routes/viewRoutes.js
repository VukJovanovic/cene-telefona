const express = require('express');

const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/kategorija/:slug', authController.isLoggedIn, viewController.getPhonesByCategory)
router.get('/admin/login', viewController.getLoginForm)
router.get('/admin/panel', authController.protect, authController.isLoggedIn, viewController.getAdminPanel);

module.exports = router;