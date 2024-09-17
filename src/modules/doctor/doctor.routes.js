
const express = require('express');
const router = express.Router();
const doctorController = require('./doctor.controller');

// Endpoint para crear un doctor
router.post('/create', doctorController.createDoctor);
router.get('/list', doctorController.listDoctors);
module.exports = router;
