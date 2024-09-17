// src/modules/internments/internments.service.js
const { poolPromise, sql } = require('../../config/db');

const createInternment = async (patientId, roomNumber, assignedBed, admissionDate) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('patientId', sql.Int, patientId)
      .input('roomNumber', sql.Int, roomNumber)
      .input('assignedBed', sql.VarChar(20), assignedBed)
      .input('admissionDate', sql.DateTime, admissionDate)
      .query(`
        INSERT INTO Internamientos (id_paciente, numero_habitacion, cama_asignada, fecha_ingreso)
        OUTPUT INSERTED.id_internamiento, INSERTED.id_paciente, INSERTED.numero_habitacion, INSERTED.cama_asignada, INSERTED.fecha_ingreso
        VALUES (@patientId, @roomNumber, @assignedBed, @admissionDate);
      `);

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error creating internment: ' + error.message);
  }
};

const listInternments = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        SELECT 
          i.id_internamiento,
          i.id_paciente,
          i.numero_habitacion,
          i.cama_asignada,
          i.fecha_ingreso,
          p.nombres,
          p.apellidos,
          p.direccion,
          p.distrito,
          p.provincia,
          p.departamento,
          p.codigo_postal,
          p.telefono,
          p.fecha_nacimiento
        FROM Internamientos i
        JOIN Pacientes p ON i.id_paciente = p.id_paciente
      `);
    
    // Estructurar el resultado para incluir los datos del paciente en un objeto
    const internments = result.recordset.map(item => ({
      id_internamiento: item.id_internamiento,
      id_paciente: item.id_paciente,
      numero_habitacion: item.numero_habitacion,
      cama_asignada: item.cama_asignada,
      fecha_ingreso: item.fecha_ingreso,
      paciente: {
        nombres: item.nombres,
        apellidos: item.apellidos,
        direccion: item.direccion,
        distrito: item.distrito,
        provincia: item.provincia,
        departamento: item.departamento,
        codigo_postal: item.codigo_postal,
        telefono: item.telefono,
        fecha_nacimiento: item.fecha_nacimiento
      }
    }));

    return internments;
  } catch (error) {
    throw new Error('Error listing internments: ' + error.message);
  }
};
module.exports = {
  createInternment,
  listInternments
};
