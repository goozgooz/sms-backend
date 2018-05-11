'use strict';

// modules needed to make Dropbox work in Node
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Dropbox = require('dropbox');
require('dotenv').config();

// exported stuff
const dropbox = module.exports = {};

// returns Object with link to main image and # of images in folder
dropbox.getMain = (inventory) => {
  let dbx = dbCreate();
  let data = {...inventory};
  let counter = 0;
  let cars = Object.keys(data).length;
  
  while(counter <= cars){
    if(counter < cars) {
      for(let id in data){
        let car = data[id];
        console.log(counter);
        console.log(car);
        counter++;
      }
      if(counter = cars) {
      console.log(counter);
      console.log('all done');
      return data;
      } 
    }
    
      // dbx.filesGetTemporaryLink({path:`/${car.photoFolder}/main.jpg`})
      //   .then(link => {
      //     car.link = link.link;
      //     resolve();
      //   })
      // dbx.filesListFolder({path: `/${car.photoFolder}`})
      //   .then(files => {
      //     car.length = files.entries.length;
      //     resolve(car);
      //   })
      //   .then(car => {
      //     console.log(data);
      //   })
    }  
};

dropbox.fetchAll = (folder) => {
  let dbx = dbCreate();
  dbx.filesListFolder({path:`/${folder}`})
    .then(files => {
      for(let file in files.entries) {
        let photoPath = files.entries[file].path_display;
        getTempLink(photoPath);
      }
    })
    .catch(console.log);  
};
// dropbox.fetchAll('pets');


// helper functions
// creates Dropbox instance
let dbCreate = () => {
  return new Dropbox.Dropbox({accessToken: process.env.ACCESS_TOKEN});
};

// gets temporary link to given image path
let getTempLink = (path) => {
  let dbx = dbCreate();
  dbx.filesGetTemporaryLink({path: path})
    .then(link => {
      console.log(link.link);
      // return link.link;
    })
    .catch(err => {
      console.log(err);
      // Promise.reject(err);
    });
};
