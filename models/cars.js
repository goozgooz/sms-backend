'use strict';

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  inventoryId: {type: String},
  title: {type: String},
  description: {type: String},
  vin: {type: String},
  year: {type: String},
  make: {type: String},
  model: {type: String},
  price: {type: String},
  condition: {type: String},
  engine: {type: String},
  drive: {type: String},
  fuel: {type: String},
  miles: {type: String},
  exteriorColor: {type: String},
  interiorColor: {type: String},
  titleStatus: {type: String},
  transmission: {type: String},
  photoFolder: {type: String},
});

module.exports = mongoose.model('Car', carSchema);