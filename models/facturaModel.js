'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const BillSchema = Schema({
	venta: Object,
	fecha: moment(),
	total: {type: Number, default: 0}
})

module.exports = mongoose.model('Bill', BillSchema)