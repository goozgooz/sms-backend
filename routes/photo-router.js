'use strict';

require('dotenv').config();

const Dropbox = require('dropbox');

const photoRoutes = module.exports = require('express').Router();


photoRoutes.post('/api/photos/:id', (req, res, next) => {
  let dbx = new Dropbox.Dropbox({accessToken: process.env.ACCESS_TOKEN});
  console.log(dbx);
  dbx.filesListFolder({path:'/pets'})
    .then(data => {
      console.log(data);
      return data.entries.map(i => {
        return i.name;
      });
    })
    .then(photos => {
      for(let photo of photos){
        dbx.filesDownload({path:`/pets/${photo}`})
          .then(blob => {
            let image = blob.fileBlob; // this is the image file I want to save 
          });
      }
    })
    .catch(console.log);
});
