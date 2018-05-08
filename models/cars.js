'use strict';

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  vin: {type: String},
  year: {type: Number,},
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
  photoFolder: {type: String},
});

module.exports = mongoose.model('Car', carSchema);