const { poolPromise, sql } = require('../../config/db');

const createPatient = async (data) => {
  const {
    nombres, apellidos, direccion, distrito, provincia, departamento,
    codigo_postal, telefono, fecha_nacimiento
  } = data;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombres', sql.NVarChar, nombres)
      .input('apellidos', sql.NVarChar, apellidos)
      .input('direccion', sql.NVarChar, direccion)
      .input('distrito', sql.NVarChar, distrito)
      .input('provincia', sql.NVarChar, provincia)
      .input('departamento', sql.NVarChar, departamento)
      .input('codigo_postal', sql.NVarChar, codigo_postal)
      .input('telefono', sql.NVarChar, telefono)
      .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
      .query(`
        INSERT INTO Pacientes 
        (nombres, apellidos, direccion, distrito, provincia, departamento, codigo_postal, telefono, fecha_nacimiento)
        OUTPUT INSERTED.id_paciente, INSERTED.nombres
        VALUES (@nombres, @apellidos, @direccion, @distrito, @provincia, @departamento, @codigo_postal, @telefono, @fecha_nacimiento)
      `);

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al crear paciente: ' + error.message);
  }
};


const listAllPatients =  async () => {

    try{

        const pool = await poolPromise;
        const result = await pool.request()
          .query('SELECT * FROM Pacientes');
        return result.recordset;

    } catch (error) {
        throw new Error('Error al listar Pacientes: ' + error.message);
      }
    }
 
module.exports = {
  createPatient,
  listAllPatients
};
