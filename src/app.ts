'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express';
import * as moment from 'moment';
import * as enrouting from './routes/rt_index';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express()

// set the view engine to ejs
app.set('views', __dirname + '/../public')
app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.json())
app.use("/public", express.static(__dirname + '/../public'));

// Index Routing
app.use( '/', new enrouting.routing_jaguer().enrouting );

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



mongoose.connect('mongodb://localhost:27017/jaguercf', { useMongoClient: 
true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {
// we're connected!
});