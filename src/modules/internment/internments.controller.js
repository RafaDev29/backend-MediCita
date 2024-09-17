// src/modules/internments/internments.controller.js
const internmentService = require('./internments.service');
const Joi = require('joi');

const internmentSchema = Joi.object({
  patientId: Joi.number().integer().required(),
  roomNumber: Joi.number().integer().required(),
  assignedBed: Joi.string().max(20).required(),
  admissionDate: Joi.date().iso().required()
});

const createInternment = async (req, res) => {
  try {
    // Validate input data
    const { error } = internmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Invalid data',
        status: false,
        data: error.details
      });
    }

    const { patientId, roomNumber, assignedBed, admissionDate } = req.body;
    const internment = await internmentService.createInternment(patientId, roomNumber, assignedBed, admissionDate);
    return res.status(201).json({
      message: 'Internment created successfully',
      status: true,
      data: internment
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating internment',
      status: false,
      data: error.message
    });
  }
};

const listInternments = async (req, res) => {
  try {
    const internments = await internmentService.listInternments();
    return res.status(200).json({
      message: 'Internments list retrieved successfully',
      status: true,
      data: internments
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving internments list',
      status: false,
      data: error.message
    });
  }
};

module.exports = {
  createInternment,
  listInternments
};
