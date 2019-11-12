const express = require('express');

// Controllers
const phoneController = require('../controllers/phoneController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protecting all routes bellow. On this middleware we check if user is logged in
router.use(authController.protect);

router.route('/').post(phoneController.createPhone);
router.route('/kategorija/:category').get(phoneController.getCategoryPhones);
router.route('/:slug').get(phoneController.getPhone).patch(phoneController.updatePhone).delete(phoneController.deletePhone);

module.exports = router;