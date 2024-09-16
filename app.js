const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { poolPromise } = require('./src/config/db'); // Importamos la conexión a la base de datos

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev')); // Para mostrar logs de las peticiones

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Probar la conexión a la base de datos en el inicio
poolPromise
  .then(pool => {
    console.log('Conexión exitosa a la base de datos desde app.js');
  })
  .catch(err => {
    console.error('Error en la conexión a la base de datos desde app.js: ', err);
  });

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
