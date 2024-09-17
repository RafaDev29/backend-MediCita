const express = require('express');
const router = express.Router();
const { createDischargeController, listDischargesController } = require('./discharges.controller');

// Route to create a new discharge
router.post('/create', createDischargeController);

// Route to list all discharges
router.get('/list', listDischargesController);

module.exports = router;
