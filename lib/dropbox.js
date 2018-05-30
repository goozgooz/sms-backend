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
  let data = {};
  Object.keys(inventory).forEach((id) => {
    let car = inventory[id];
    data[id] = car;
    dbx.filesGetTemporaryLink({path:`/${car.photoFolder}/main.jpg`})
      .then(link => {
        car.link = link.link;
        console.log(data);
        return(car);
      })
      .catch(err => {
        console.log(err);
      });
    
    // console.log('inside', data);
  });
  // console.log('outside', data);
};
 

// let getPhotos = (inventory) => {
//       dbx.filesListFolder({path: `/${car.photoFolder}`})
//         .then(files => {
//           car.length = files.entries.length;
//           return(car);
//         })
//         .then(car => {
//           resolve(data);
//         })
//         .catch(err => {
//           reject(err);
//         });
//       }
//     });
// };

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
