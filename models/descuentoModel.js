'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DiscountSchema = Schema({
	producto: Object,
	descuento: Number,
	disponible: Boolean 
})

module.exports = mongoose.model('Discount', DiscountSchema)