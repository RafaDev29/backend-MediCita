const { createDischarge, listDischarges } = require('./discharges.service');
const { createDischargeSchema } = require('./dto/discharges.dto');

const createDischargeController = async (req, res) => {
 
  try {
    // Validate the request body using Joi
    const { error } = createDischargeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Invalid request data',
        status: false,
        data: error.details
      });
    }

    const { internmentId, dischargeDate, dischargeTime, authorizingDoctorId } = req.body;
    const newDischarge = await createDischarge(internmentId, dischargeDate, dischargeTime, authorizingDoctorId);
    res.status(201).json({
      message: 'Discharge created successfully',
      status: true,
      data: newDischarge
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating discharge',
      status: false,
      data: error.message
    });
  }
};

const listDischargesController = async (req, res) => {
  try {
    const discharges = await listDischarges();
    res.status(200).json({
      message: 'Discharges retrieved successfully',
      status: true,
      data: discharges
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error listing discharges',
      status: false,
      data: error.message
    });
  }
};

module.exports = {
  createDischargeController,
  listDischargesController
};
