'use strict';

const Car = require('../models/cars.js');
const jsonParser = require('body-parser').json();
const carRoutes = module.exports = require('express').Router();

carRoutes.get('/api/cars', (req,res,next) => {
  Car.find({})
    .then(res.send.bind(res))
    .catch(next);
});

carRoutes.post('/api/cars', jsonParser, (req,res,next) => {
  new Car(req.body).save()
    .then(res.send.bind(res))
    .catch(next);
});

carRoutes.patch('/api/cars/:id', jsonParser, (req,res,next) => {
  let options = {new:true, runValidators:true};
  Car.findByIdAndUpdate(req.params.id, req.body, options)
    .then(res.send.bind(res));
    .catch() //FIGURE OUT WHAT HAPPENS WHEN ID DOESN'T EXIST account for that error in middleware
});

// delete

// test

// http POST localhost:3000/api/cars < bmw.json