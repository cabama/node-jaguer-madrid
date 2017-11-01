'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express';
import * as moment from 'moment';
import * as enrouting from 'routes/rt_index';


// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express()
// set the view engine to ejs
app.set('views', __dirname + '/../public')
app.set('view engine', 'ejs');

// Public folder
app.use("/public", express.static(__dirname + '/../public'));
app.use('/', enrouting.routing_jaguer);

app.get('/nombre/:name', (req, res)=>{
  debugger
  console.log('gola')
  res.render('')
})

app.get('/', (req, res) => {
  res.render('template.ejs')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);