'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express';
import * as moment from 'moment';
import * as enrouting from './routes/Index.Router';
import * as bodyParser from 'body-parser'
import mongoose = require("mongoose"); //import mongoose

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017");

// App
const app = express()

// set the view engine to ejs
app.set('views', __dirname + '/../public')
app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.json())
app.use("/public", express.static(__dirname + '/../public'));

// Index Routing
app.use( '/api', new enrouting.routing_jaguer().enrouting );

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);