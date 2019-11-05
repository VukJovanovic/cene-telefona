const express = require('express');

// Controllers
const phoneController = require('../controllers/phoneController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protecting all routes bellow. On this middleware we check if user is logged in
router.use(authController.protect);

router.route('/').get(phoneController.getAllTelephones).post(phoneController.createPhone);
router.route('/kategorija/:category').get(phoneController.getCategoryPhones);
router.route('/:id').get(phoneController.getPhone).patch(phoneController.updatePhone).delete(phoneController.deletePhone);

module.exports = router;