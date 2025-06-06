const express = require('express');
const router = express.Router();

const formController = require('../controllers/Form.controller');
const visitorController = require('../controllers/Visitor.controller');

// Visitor route
router.get('/form/:form_id', visitorController.renderForm);

// API route
router.get('/api/forms', formController.getAllForms);
router.get('/api/forms/:form_id', formController.getFormWithFields);
router.post('/api/forms', formController.createFormWithFields);
router.put('/api/forms/:form_id', formController.updateFormWithFields);
router.delete('/api/forms/:form_id', formController.deleteFormWithFields);

module.exports = router;
