const express = require('express');
const router = express.Router();

const authController = require('../controllers/Auth.controller');

const checkSession = require('../middlewares/checkSession');

router.get('/auth/login', checkSession, authController.renderLogin);

router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);

module.exports = router;