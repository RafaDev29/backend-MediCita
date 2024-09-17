// src/modules/visits/visits.dto.js
const Joi = require('joi');

const createVisitDTO = Joi.object({
  internmentId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  visitDate: Joi.date().iso().required(),
  visitTime: Joi.string().isoDate().required()
});

module.exports = {
  createVisitDTO
};
