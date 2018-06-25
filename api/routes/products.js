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

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
