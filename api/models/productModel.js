'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
	nombre: String,
	categoria: {type: String, enum: []},
	genero: {type: String, enum['Masculino', 'Femenino']},
	descripcion: String,
	talla: {type: String, enum['S', 'M', 'X', 'XL', '2X', '3X', 'L']},
	precio: {type: Number, default: 0}
})

module.exports = mongoose.model('Product', ProductSchema)
