'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Car = require('../models/cars.js');

// modules needed to make Dropbox work in Node
require('es6-promise').polyfill();
require('isomorphic-fetch');

// steps to create 'dbx' object that will be used to access dropbox
const Dropbox = require('dropbox');
require('dotenv').config();
const dbx = new Dropbox.Dropbox({accessToken: process.env.ACCESS_TOKEN});

// exported stuff
const dropbox = module.exports = {};


dropbox.getInventory = () => {
  mongoose.connect(process.env.MONGODB_URI);
  dbx.filesDownload({path:'/test.txt'})
    .then(result => {
      let data = result.fileBinary.toString('utf8').trim().split('\r\n');
      return createCarObjects(data);
    })
    .then(inventory => {
      for(let id in inventory){
        new Car(inventory[id]).save()
          .then(car => {
            console.log('CAR ADDED: ', car);
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
};

dropbox.getInventory();


let createCarObjects = (data) => {
  let inventory = {};
  for(let car of data) {
    let items = car.split('|');
    inventory[items[0]] = {
      inventoryId: items[0],
      year: items[1],
      make: items[2],
      model: items[3],
      transmission: items[4],
      miles: items[5],
      exteriorColor: items[6],
    };
  }
  return inventory;
};