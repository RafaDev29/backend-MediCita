require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./src/modules/user/user.routes');
const responseMiddleware = require('./src/middleware/responseMiddleware');

// Middleware para procesar JSON y para manejar respuestas
app.use(express.json());
app.use(responseMiddleware);

// Rutas
app.use('/api/users', userRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
