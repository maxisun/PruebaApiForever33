const express = require('express');
const router = express.Router();

//peticiones GET
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

//peticiones POST (status 201)
router.post('/', (req, res, next) => {
  //creando una orden a partir del req del POST
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: 'Order was created',
    order: order
  });
});

//obteniendo una orden especifica
router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderId
  });
});

//peticion delete a una orden especifica
router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order deleted',
    orderId: req.params.orderId
  });
});

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
