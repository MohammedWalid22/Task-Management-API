const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');

const router = express.Router();

router.post('/register', authValidator.registerSchema, authController.register);
router.post('/login', authValidator.loginSchema, authController.login);
router.get('/logout', authController.logout);

module.exports = router;