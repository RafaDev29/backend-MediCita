const Joi = require('joi');

// Esquema de validación para crear un paciente
const createPatientSchema = Joi.object({
  nombres: Joi.string().min(3).max(100).required(),
  apellidos: Joi.string().min(3).max(100).required(),
  direccion: Joi.string().max(255),
  distrito: Joi.string().max(100),
  provincia: Joi.string().max(100),
  departamento: Joi.string().max(100),
  codigo_postal: Joi.string().max(20),
  telefono: Joi.string().max(20),
  fecha_nacimiento: Joi.date().required()
});

module.exports = {
  createPatientSchema
};
