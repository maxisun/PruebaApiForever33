const express = require('express');
const router = express.Router();
//paquete mongoose
const mongoose = require('mongoose');
//importanto Authentication de Token
const checkAuth = require('../middleware/check-auth');
//importando el modelo de orders
const Order = require('../models/orders');
//importando el modelo de productos
const Product = require('../models/product');

//peticiones GET
router.get('/', checkAuth, (req, res, next) => {
  Order.find()
  .select('_id productId quantity')
  // muestra un merge de los productos linkeados a las ordenes y los campos que queremos que se vean nada mas
  .populate('productId', '_id name price')
  .exec()
  .then(docs => {
    if (docs.length > 0){
      res.status(200).json(docs);//retornamos el response de arriba
    } else { //por si no hay productos
      res.status(404).json({
        message: "No orders found"
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

//peticiones POST (status 201)
router.post('/', checkAuth, (req, res, next) => {
  //verificando la existencia del id de un producto
  Product.findById(req.body.productId)
    .then(product => {
      //verificando que no sea un producto nulo
      if (!product) {
        return res.status(404).json({ //retorna esto y no ejecuta nada mas
          message: 'Product is inexistent'
        });
      }
      //creando una orden a partir del req del POST
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
      });
       return order.save();
     })
     .then(result => {
       console.log(result);
       res.status(201).json({
         message: 'Your order has been saved',
         YourCreatedOrder: {
           _id: result._id,
           product: result.productId,
           quantity: result.quantity
         }
       });
     })
     .catch(err =>{
       res.status(500).json({
         error: err
       });
     });
});

//obteniendo una orden especifica
router.get('/:orderId', checkAuth, (req, res, next) => {
  //extrayendo el Id del request
  const id = req.params.orderId
  Order.findById(id)
  .select('_id productId quantity')
  .populate('productId', '_id name price')
  .exec()
  .then(doc => {
    console.log("From database", doc);
    //si se encuentra el id y si no se encuentra
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'No order found with the provided ID'});
    }
  })
  .catch(err => {
    res.status(500).json({error:err});
  });
});

//peticion delete a una orden especifica
router.delete('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId
  Order.findByIdAndRemove(id)
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'The order was successfully deleted'
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
