'use strict';

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {type: String, requried: true},
  description: {type: String},
  vin: {type: Number},
  year: {type: Number, required: true},
  make: {type: String, required: true},
  model: {type: String, required: true},
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