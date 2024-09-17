// src/modules/internments/internmentDTO.js

const Joi = require('joi');

const internmentSchema = Joi.object({
  patient_id: Joi.number().integer().required(),
  room_number: Joi.number().integer().required(),
  assigned_bed: Joi.string().max(20).required(),
  admission_date: Joi.date().iso().required()
});

module.exports = internmentSchema;
