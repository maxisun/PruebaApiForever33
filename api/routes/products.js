const express = require('express');
const router = express.Router();

//peticiones GET
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

//peticiones POST
router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST request to /products'
  });
});

//obteniendo un producto especifico
router.get('/:productId', (req, res, next) => {
  //extrayendo el Id del request
  const id = req.params.productId
  if (id === 'sebas+'){
    res.status(200).json({
      message: 'You discovered the special ID: '+ id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
});

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
