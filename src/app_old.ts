'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express'
// Constants
const PORT = 8181;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/nombre/:name', (req, res)=>{
  res.send('Hola '+name)
})

app.get('/', (req, res) => {
  res.send('Hello Mundo\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);