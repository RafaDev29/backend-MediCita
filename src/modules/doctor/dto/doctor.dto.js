// src/modules/doctor/dto/doctor.dto.js
const Joi = require('joi');

// Esquema de validación para crear un doctor
const createDoctorSchema = Joi.object({
  names: Joi.string().max(100).required(),
  lastNames: Joi.string().max(100).required(),
  phone: Joi.string().max(20).required(),
  specialty: Joi.string().max(100).required()
});

module.exports = {
  createDoctorSchema
};
