const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products')

//redirige las requests de products hacia el archivo de products.js
app.use('/products', productRoutes);

module.exports = app;
