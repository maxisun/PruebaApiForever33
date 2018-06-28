"use strict";
const express = require('express');
const router = express.Router();
//paquete mongoose
const mongoose = require('mongoose');
//paquete bcrypt
const bcrypt = require('bcrypt');
//paquete jsonwebtoken
const jwt = require('jsonwebtoken');
//variables
require('dotenv').config();
//importando el modelo de users
const User = require('../models/users');

//
router.get('/', (req, res, next) => {
  User.find()
  .select('_id email')
  .exec()
  .then(docs => {
    if (docs.length > 0){
      res.status(200).json(docs);
    } else { //por si no hay productos
      res.status(404).json({
        message: "No users found"
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});
//




//POST para usuario signup
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
    /*  bcrypt.hash(req.body.password, 10, (err, hash) => {
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
      });*/
    }
  });
});

//POST login
router.post('/login', (req, res, next) => {
  User.find({email: req.body.email}).exec()
  .then(user => { // un array de usuarios/correos
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Authentication Failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication Failed'
        });
      }
      if (result) {
        //token method
        const token = jwt.sign({
          userId: user[0]._id,
          email: user[0].email
        },
        process.env.JWT_KEY,
        {
          expiresIn: "8h"
        });
        return res.status(200).json({
          message: 'Login successfully',
          token: token
        });
      }
      res.status(401).json({
        message: 'Authentication Failed'
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

//DELETE para users
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findByIdAndRemove(id)
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
