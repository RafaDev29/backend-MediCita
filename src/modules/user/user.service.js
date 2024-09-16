const { poolPromise, sql } = require('../../config/db');
const { generateToken } = require('./jwt/jwt');

const createUser = async (nombre_usuario, contrasena) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('nombre_usuario', sql.NVarChar, nombre_usuario)
      .input('contrasena', sql.NVarChar, contrasena)
      .query('INSERT INTO Usuarios (nombre_usuario, contrasena) OUTPUT INSERTED.id_usuario, INSERTED.nombre_usuario VALUES (@nombre_usuario, @contrasena)');

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

const loginUser = async (nombre_usuario, contrasena) => {
  try {
    const pool = await poolPromise;

    // Buscar el usuario por nombre de usuario
    const result = await pool.request()
      .input('nombre_usuario', sql.NVarChar, nombre_usuario)
      .input('contrasena', sql.NVarChar, contrasena)  // Comparar la contraseña
      .query('SELECT id_usuario, nombre_usuario FROM Usuarios WHERE nombre_usuario = @nombre_usuario AND contrasena = @contrasena');

    const user = result.recordset[0];

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Generar el token
    const token = generateToken(user);

    return {
      user,
      token
    };
  } catch (error) {
    throw new Error('Error en el login: ' + error.message);
  }
};

module.exports = {
  createUser,
  loginUser
};
