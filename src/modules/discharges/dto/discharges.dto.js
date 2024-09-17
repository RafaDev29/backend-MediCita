const Joi = require('joi');

// Define the schema for creating a discharge
const createDischargeSchema = Joi.object({
  internmentId: Joi.number().integer().required(),
  dischargeDate: Joi.date().iso().required(),
  dischargeTime: Joi.date().iso().required(),
  authorizingDoctorId: Joi.number().integer().required(),
});

// Define the schema for listing discharges (optional)
const listDischargesSchema = Joi.object({
  // You can add query parameters validation here if needed
});

module.exports = {
  createDischargeSchema,
  listDischargesSchema
};
