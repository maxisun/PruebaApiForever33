//paquete de mongoose
const mongoose = require('mongoose');

//creacion del Schema de productos
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //es un tipo de serial que es como una String larga
  name: String, //nombre es una string
  price: Number //precio es un numero
});

//esto es para exportar el Schema como un modelo. Como un modelo de objeto para ser construido
module.exports = mongoose.model('Product', productSchema);
