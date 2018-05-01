'use strict';

// modules needed to make Dropbox work in Node
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Dropbox = require('dropbox');
require('dotenv').config();

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

// exported stuff
const dropbox = module.exports = {};

// returns Object with link to main image and # of images in folder
dropbox.getMain = (folder) => {
  let dbx = dbCreate();
  let info = {};
  
  // gets main image
  dbx.filesGetTemporaryLink({path:`/${folder}/main.jpg`})
    .then(link => {
      info.link = link.link;
      return info;
    })
    // gets # of images in folder
    .then(info => {
      dbx.filesListFolder({path: `/${folder}`})
        .then(files => {
          info.length = files.entries.length;
          return info;
        });
    })
    .catch(err => {
      console.log(err);
      // Promise.reject(err);
    });
};
// dropbox.getMain('pets');

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

