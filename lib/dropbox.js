import { getDiffieHellman } from 'crypto';

'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Dropbox = require('dropbox');
require('dotenv').config();


const dropbox = module.exports = {};

dropbox.getMain = (folder) => {
  let dbx = new Dropbox.Dropbox({accessToken: process.env.ACCESS_TOKEN});
  dbx.filesGetTemporaryLink({path:`/${folder}/main.jpg`})
    .then(console.log)
    .catch(console.log);
};
// dropbox.getMain('pets');

dropbox.fetchAll = (folder) => {
  let dbx = new Dropbox.Dropbox({accessToken: process.env.ACCESS_TOKEN});
  dbx.filesListFolder({path:'/pets'})
    .then(console.log)
    .catch(console.log);  
};

dropbox.fetchAll();


let getTempLink = (path, file) =>

};
