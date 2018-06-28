"use strict";
const express = require('express');
const router = express.Router();
//importanto Authentication de Token
const checkAuth = require('../middleware/check-auth');
//importando controlador de orders
const OrdersController = require('../controllers/orders');

//peticiones GET
router.get('/', checkAuth, OrdersController.orders_get_all);

//peticiones POST (status 201)
router.post('/', checkAuth, OrdersController.orders_create_order);

//obteniendo una orden especifica
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

//peticion delete a una orden especifica
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

//el router configura esto para que pueda ser exportado y pueda ser usado como module.expots = app;
module.exports = router;
