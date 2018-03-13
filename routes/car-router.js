'use strict';

const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();

const Car = require('../models/cars.js');
const carRoutes = module.exports = require('express').Router();

carRoutes.get('/api/cars', (req,res,next) => {
  Car.find({})
    .then(cars => res.json(cars))
    .catch(next);
});

carRoutes.get('/api/cars/:id', (req,res,next) => {
  Car.findById(req.params.id)
    .then(car => {
      if(!car) return next(httpErrors(404, 'id not found'));
      res.json(car);
    })
    .catch(next);
});

carRoutes.post('/api/cars', jsonParser, (req,res,next) => {
  new Car(req.body).save()
    .then(car => res.json(car))
    .catch(next);
});

carRoutes.patch('/api/cars/:id', jsonParser, (req,res,next) => {
  let options = {new:true, runValidators:true};
  Car.findByIdAndUpdate(req.params.id, req.body, options)
    .then(car => {
      if(!car) return next(httpErrors(404, 'id not found'));
      res.json(car);
    })
    .catch(next);
});

carRoutes.delete('/api/cars/:id', (req,res,next) => {
  Car.findByIdAndRemove(req.params.id)
    .then(car => {
      if(!car) return next(httpErrors(404, 'id not found'));
      res.sendStatus(204);
    })
    .catch(next);
});