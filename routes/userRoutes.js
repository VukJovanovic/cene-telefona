const express = require('express');

// Controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
