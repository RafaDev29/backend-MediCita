const patientService = require('./patient.service');
const { createPatientSchema } = require('./dto/patient.dto');

const createPatient = async (req, res) => {
  const { error } = createPatientSchema.validate(req.body);

  if (error) {
    return res.error(`Error de validación: ${error.details[0].message}`, 400);
  }

  try {
    // Pasamos el req.body directamente al servicio
    const result = await patientService.createPatient(req.body);

    res.success(result, 'Paciente creado exitosamente');
  } catch (error) {
    res.error('Error al crear paciente: ' + error.message, 500);
  }
};



    // Controlador para listar todos los pacientes
   const listPatients = async (req, res) =>{
      try {
        const patients = await patientService.listAllPatients();
        return res.status(200).json({
          message: 'Lista de pacientes recuperada exitosamente',
          status: true,
          data: patients
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Error al recuperar la lista de pacientes',
          status: false,
          data: error.message
        });
      }
    }
module.exports = {
  createPatient,
  listPatients
};
