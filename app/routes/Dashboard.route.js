const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/Dashboard.controller');
const formController = require('../controllers/Form.controller');
const userController = require('../controllers/User.controller');
const formResponseController = require('../controllers/FormResponse.controller');

const requireAuth = require('../middlewares/requireAuth');

router.get('/dashboard', dashboardController.renderDashboard);

router.get('/dashboard/forms', formController.getAllForms);
router.get('/dashboard/forms/new', dashboardController.renderNewForm);
router.get('/dashboard/forms/:form_id', formController.getFormWithFields);
router.get('/dashboard/forms/:form_id/responses', dashboardController.renderFormResponse);

router.get('/dashboard/users', userController.getAllUsers);
router.get('/dashboard/users/new', dashboardController.renderNewUser);
// router.get('/dashboard/users/:user_id/edit', requireAuth, dashboardController.renderEditUser);

module.exports = router;