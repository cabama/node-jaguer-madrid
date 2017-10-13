'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express'

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


app.get('/nombre/:name', (req, res)=>{
  res.render('')
})

app.get('/', (req, res) => {
  res.render('template.ejs')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);