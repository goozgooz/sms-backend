'use strict';

const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();

const dropbox = require('../lib/dropbox.js');

const Car = require('../models/cars.js');
const carRoutes = module.exports = require('express').Router();

carRoutes.get('/api/cars', (req,res,next) => {
  let inventory = {};
  Car.find({})
    .then(cars => {
      // for each car returned from DB -> buildup inventory object to send to frontend
      for(let car of cars){
        // dropbox function to get main photo & number of photos in folder
        dropbox.getMain(car.photoFolder)
          .then(console.log)
          .catch(console.log);
      }
      res.json(inventory);
    })
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
// http post :3000/api/cars < bmw.json;

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