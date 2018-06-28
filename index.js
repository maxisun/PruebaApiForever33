'use strict'
/*const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
	if(err) throw err
		console.log('Conexion lista')

	app.listen(config.port, () => {
		console.log(`http://localhost:${config.port}`)
	})
})*/

//metodo superior para el server/index.js :v
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
