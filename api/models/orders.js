//paquete de mongoose
const mongoose = require('mongoose');

//creacion del Schema de productos
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //es un tipo de serial que es como una String larga
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},//creando una relacion al schema de productos
  quantity: {type: Number, default: 1}
});

//esto es para exportar el Schema como un modelo. Como un modelo de objeto para ser construido
module.exports = mongoose.model('Order', orderSchema);
