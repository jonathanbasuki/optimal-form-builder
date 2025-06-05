const express = require('express');
const router = express.Router();

const formController = require('../controllers/Form.controller');

router.get('/api/forms', formController.getAllForms);
router.get('/api/forms/:form_id', formController.getFormWithFields);
router.post('/api/forms', formController.createFormWithFields);
router.put('/api/forms/:form_id', formController.updateFormWithFields);
router.delete('/api/forms/:form_id', formController.deleteFormWithFields);

module.exports = router;
