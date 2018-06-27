const express = require('express');
const router = express.Router();
//paquete mongoose
const mongoose = require('mongoose');
//paquete bcrypt
const bcrypt = require('bcrypt');
//importando el modelo de users
const User = require('../models/users');

//POST para usuario
router.post('/signup', (req, res, next) => {
  //verificando que no se repitan los correos
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'This mail is already associated with another account'
      });
    } else {
      //se empieza a encryptar y a guardar en la base si se tiene exito
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'User created successfully'
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
        }
      });
    }
  });
});

//DELETE para users
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  Product.findByIdAndRemove(id)
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'The user was successfully deleted'
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});





















module.exports = router;
