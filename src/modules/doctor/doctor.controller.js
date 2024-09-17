// src/modules/doctor/doctor.controller.js
const { createDoctorSchema } = require('./dto/doctor.dto');
const doctorService = require('./doctor.service');

const createDoctor = async (req, res) => {
  const { error } = createDoctorSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
      status: false,
      data: null
    });
  }

  try {
    const { names, lastNames, phone, specialty } = req.body;
    const result = await doctorService.createDoctor(names, lastNames, phone, specialty);
    res.status(201).json({
      message: 'Doctor created successfully',
      status: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating doctor',
      status: false,
      data: 'Error in creating doctor: ' + error.message
    });
  }
};

const listDoctors = async (req, res) => {
    try {
      const doctors = await doctorService.listDoctors();
      res.success(doctors, 'Doctores listados exitosamente');
    } catch (error) {
      res.error('Error al listar doctores', 500);
    }
  };
  
module.exports = {
  createDoctor,
  listDoctors
};
