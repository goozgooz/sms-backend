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
  let data = Object.keys(inventory).map(id => {
    let car = inventory[id];
    return getCarInfo(car);
  });
  Promise.all(data)
    .then(result => {
      console.log({result});
    })
    .catch(console.error);
};

let getCarInfo = (car) => {
  return new Promise((resolve, reject) => {
    let dbx = dbCreate();
    dbx.filesGetTemporaryLink({path:`/${car.photoFolder}/main.jpg`})
      .then(link => {
        car.link = link.link;
        resolve(car);
      })
      .catch(err => {
        Promise.reject(err);
      }); 
  });
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


// let test = {
//   photoFolder: 'pets',
// };

// let ret = getCarInfo(test);
// console.log(ret);
