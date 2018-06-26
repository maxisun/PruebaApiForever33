const express = require('express');
//paquete para el manejo de rutas y peticiones Http: Router
const router = express.Router();
//paquete mongoose
const mongoose = require('mongoose');
//importando el modelo de productos
const Product = require('../models/product');


//peticiones GET para obtener todos los productos
/*router.get('/', (req, res, next) => {
  Product.find()//find() sin parametros = select *
  .select('name price _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length, //contamos todos lo productos
      products: docs.map(doc =>{
        return {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          request: {
            type: 'GET',
            url: 'https://maxisun-prueba.herokuapp.com/products/'+ doc._id
          }
        }
      }) //ponemos un campo de Arreglo de Productos
    }
    if (docs.length > 0){
      res.status(200).json(response);//retornamos el response de arriba
    } else { //por si no hay productos
      res.status(404).json({
        message: "No products found"
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
*/
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'holi'
  });
});





//peticiones POST (status 201)
router.post('/', (req, res, next) => {
  //creando una instanca del modelo de producto. Como un constructor de Java. Se crea a partir de los datos que se envian en la req de POST
  const product = new Product({
    _id: new mongoose.Types.ObjectId(), //esto nos creara un Id automaticamente. Por el paquete mongoose
    name: req.body.name,
    price: req.body.price
  });
  // lo guarda en la base de datos. y hace log a la consola
  product.save()
  .then(result => {
    console.log(result);
    //request
    res.status(201).json({
      message: 'The product was created succesfully!',
      //mostrando el producto creado
      createdProduct: {
        _id: result._id,
        name: result.name,
        price: result.price,
        request: {
          type: 'GET',
          url: 'https://maxisun-prueba.herokuapp.com/products/'+ result._id
        }
      }
    });
    //error
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


//obteniendo un producto especifico
router.get('/:productId', (req, res, next) => {
  //extrayendo el Id del request
  const id = req.params.productId
  Product.findById(id)
  .select('name price _id')
  .exec()
  .then(doc => {
    console.log("From database", doc);
    //si se encuentra el id y si no se encuentra
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'No product found with the provided ID'});
    }
  })
  .catch(err => {
    res.status(500).json({error:err});
  });
});


//patch para reemplazar un producto
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOperations = {};
  for (const ops of req.body){
    updateOperations[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {$set: updateOperations})
  .exec()
  .then(result =>{
    console.log(result);
    res.status(200).json({
      message: 'The product was updated successfully'
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


//delete para borrar un producto
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findByIdAndRemove(id)
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'The product was successfully deleted'
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
