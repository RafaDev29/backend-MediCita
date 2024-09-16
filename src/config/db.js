require('dotenv').config(); // Cargar variables del entorno desde .env
const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT), 
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error en la conexión a SQL Server: ', err);
  });

module.exports = {
  sql, poolPromise
};
