const express = require('express');
const router = express.Router();

//peticiones GET
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

//peticiones POST (status 201)
router.post('/', (req, res, next) => {
  //una const de producto que se crea a partir de los datos que se envian en la req de POST
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: 'Handling POST request to /products',
    createdProduct: product //mostrando el producto creado
  });
});

//obteniendo un producto especifico
router.get('/:productId', (req, res, next) => {
  //extrayendo el Id del request
  const id = req.params.productId
  if (id === 'sebas+'){
    res.status(200).json({
      //mostrando el id y el mensaje
      message: 'You discovered the special ID',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
});

//patch para reemplazar un producto
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product!'
  });
});

//delete para borrar un producto
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
  });
});

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
