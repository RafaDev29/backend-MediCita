// src/modules/doctor/doctor.service.js
const { poolPromise, sql } = require('../../config/db');

const createDoctor = async (names, lastNames, phone, specialty) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('names', sql.VarChar(100), names)
      .input('lastNames', sql.VarChar(100), lastNames)
      .input('phone', sql.VarChar(20), phone)
      .input('specialty', sql.VarChar(100), specialty)
      .query(`
        INSERT INTO Medicos (nombres, apellidos, telefono, especialidad)
        OUTPUT INSERTED.id_medico, INSERTED.nombres, INSERTED.apellidos, INSERTED.telefono, INSERTED.especialidad
        VALUES (@names, @lastNames, @phone, @specialty);
      `);

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error in creating doctor: ' + error.message);
  }
};


const listDoctors = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT id_medico, nombres, apellidos, telefono, especialidad FROM Medicos');
      return result.recordset;
    } catch (error) {
      throw new Error('Error al listar doctores: ' + error.message);
    }
  };
module.exports = {
  createDoctor,
  listDoctors
};
