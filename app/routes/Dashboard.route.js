const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/Dashboard.controller');

const requireAuth = require('../middlewares/requireAuth');

router.get('/dashboard', requireAuth, dashboardController.renderDashboard);

module.exports = router;