const express = require('express');
const app = express();
//paquete morgan para log de terminal
const morgan = require('morgan');
// constantes de rutas (imports)
const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

//se usa entes de lidiar con las requests de las rutas
app.use(morgan('dev'));

//redirige las requests de products hacia el archivo de products.js
app.use('/products', productRoutes);
//redirige las requests de orders hacia el archivo de orders.js
app.use('/orders', ordersRoutes);

//lidiando con errores, si no logro acceder a ninguna de las rutas de arriba
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);//se pasa a la funcion de abajo
});

//esta funcion maneja todo tipo de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
