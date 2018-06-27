const express = require('express');
const router = express.Router();
//paquete mongoose
const mongoose = require('mongoose');
//importando el modelo de users
const User = require('../models/users');

router.post('/signup', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  });
});






















module.exports = router;
