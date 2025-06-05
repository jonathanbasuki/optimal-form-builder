const express = require('express');
const router = express.Router();

const userController = require('../controllers/User.controller');

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:identifier', userController.getUserDetail);
router.post('/api/users', userController.createUser);
router.put('/api/users/:user_id', userController.updateUser);
router.delete('/api/users/:user_id', userController.deleteUser);

module.exports = router;
