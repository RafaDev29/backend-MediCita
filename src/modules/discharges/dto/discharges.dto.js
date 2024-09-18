const Joi = require('joi');

// Expresión regular para validar el formato de hora HH:mm
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Define el esquema para crear un alta (discharge)
const createDischargeSchema = Joi.object({
  internmentId: Joi.number().integer().required(),
  dischargeDate: Joi.date().iso().required(), // Validar la fecha en formato ISO
  dischargeTime: Joi.string().pattern(timePattern).required(), // Validar la hora en formato HH:mm
  authorizingDoctorId: Joi.number().integer().required(),
});

module.exports = {
  createDischargeSchema,
};
