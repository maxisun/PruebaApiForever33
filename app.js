'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();//environment variables

//const api = require('./routes/productRoutes.js') ? repollo

//conexion a una base de datos, cree otro cluster
monoose.connect('mongodb+srv://Forever33:'+process.env.MONGO_ATLAS_PASSWORD+'@forever33-ijnxz.mongodb.net/test?retryWrites=true');
mongoose.Promise = global.Promise;





//MiddleWare:
//esto es para el manejo de imagenes
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//que mierdas es esto:
//app.use('/api', api)

//manejo de error CORS por medio de Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');//permite cualquier origen para acceder al API
  //res.header('Access-Control-Allow-Origin','http://peneduro.com');//solo esa direccion  de origen puede acceder
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");//son los Headers que permitimos para acceder al API
  //El browser siempre envia esto, asi que le indicamos que metodos estan disponibles para el uso de la API
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');//protocolos Http que soporta esta API
    return res.status(200).json({});//se responde que metodos tiene permitido usar al browser o cliente
  }
  next();//procedemos a resto de las rutas
});

//Rutas y manejo de estas:

  //Rutas:



  //Errores:
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
