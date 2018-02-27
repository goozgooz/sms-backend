'use strict';

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  vin: {type: Number},
  year: {type: Number},
  make: {type: String},
  model: {type: String},
  price: {type: Number},
  condition: {type: String},
  engine: {type: String},
  drive: {type: String},
  fuel: {type: String},
  odometer: {type: Number},
  exteriorColor: {type: String},
  interiorColor: {type: String},
  titleStatus: {type: String},
  transmission: {type: String},
});

module.exports = mongoose.model('Car', carSchema);


/*
title / headline
description
vin
year
make
model
price
vehicle condition
engine
drive
fuel
odometer
exterior color
interior color
title status
transmission



*/