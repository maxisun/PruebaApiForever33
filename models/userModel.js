'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const md5 = require('md5')

const UserSchema = new Schema({
	nombreUsuario: String,
	contrasena: {type: String, select: false},
	nombre: String,
	apellido: String,
	correoElectronico: {type: String, unique: true, lowercase: true},
	direccion: String,
	telefono: String,
	tarjeta: String
})

UserSchema.pre('save', (next) =>{
	let user = this
	if(!user.isModified('contrasena')) return next()

	md5.genSalt(10, (err, salt) => {
		if(err) return next(err)

		md5.hash(user.contrasena, salt, null, (err, hash) =>{
			if(err) return next(err)
			
			user.contrasena = hash
			next()
		})
	})
})

module.exports = mongoose.model('User', UserSchema)