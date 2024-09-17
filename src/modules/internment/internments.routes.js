// src/modules/internments/internments.routes.js
const express = require('express');
const router = express.Router();
const internmentController = require('./internments.controller');

// Route to create a new internment
router.post('/create', internmentController.createInternment);

// Route to list all internments
router.get('/list', internmentController.listInternments);

module.exports = router;
