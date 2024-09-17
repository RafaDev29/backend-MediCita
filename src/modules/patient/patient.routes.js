const express = require('express');
const router = express.Router();
const patientController = require('./patient.controller');

// Ruta para crear un paciente
router.post('/create', patientController.createPatient);
router.get('/list', patientController.listPatients);

module.exports = router;
