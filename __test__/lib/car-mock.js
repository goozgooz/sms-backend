'use strict';

const Car = require('../../models/cars.js');

let create = () => new Car(bmw).save();

let createMany = () => {
  new Car(bmw).save();
  new Car(ford).save();
};

let remove = () => Car.remove({});

const bmw = {
  title: 'really swag new bimmer',
  description: 'this bimmer is a persian\'s dream, it\'s super duper swag',
  vin: '69696969',
  year: 2013,
  make: 'BMW',
  model: 'M3',
  price: 69000,
  condition: 'excellent',
  engine: 'V8',
  drive: 'RWD',
  fuel: 'Petrol',
  odometer: 42069,
  exteriorColor: 'black',
  interiorColor: 'black',
  titleStatus: 'clean',
  transmission: 'manual',
};

const ford ={
  title: 'new cool ford',
  description: 'brand spanking new ford explorer with all the bells and whistles',
  vin: '123456',
  year: 2018,
  make: 'Ford',
  model: 'Explorer',
  price: 50000,
  condition: 'new',
  engine: 'V6',
  drive: 'AWD',
  fuel: 'Petrol',
  odometer: 42069,
  exteriorColor: 'white',
  interiorColor: 'black',
  titleStatus: 'clean',
  transmission: 'auto',  
};

module.exports = {create, createMany, remove, bmw, ford};
