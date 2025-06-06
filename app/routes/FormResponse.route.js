const express = require('express');
const router = express.Router();

const formResponseController = require('../controllers/FormResponse.controller');

router.get('/api/responses/:form_id', formResponseController.getAllFormResponses);
router.get('/api/responses/:response_id/answer', formResponseController.getFormResponseDetail);
router.post('/api/responses', formResponseController.addFormResponse);
// router.put('/api/responses/:form_id', formResponseController.updateFormResponse);
router.delete('/api/responses/:response_id', formResponseController.deleteFormResponse);

module.exports = router;
