'use strict';

const Car = require('../models/cars.js');
const jsonParser = require('body-parser').json();
const carRoutes = module.exports = require('express').Router();

carRoutes.post('/api/cars', jsonParser, (req,res,next) => {
  new Car(req.body).save()
    .then(res.send.bind(res))
    .catch(next);
});

