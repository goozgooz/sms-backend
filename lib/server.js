'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// routes
const carRoutes = require('../routes/car-router.js');
const errorRoutes = require('./error-middleware.js');

// server and server state
const app = express();
let server = null;

// middleware and routes
app.use(morgan('dev'));
app.use(carRoutes);
app.use(errorRoutes);


module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      // is server already running?
      if(server) return reject(new Error('SERVER ALREADY RUNNING'));

      // if server off -> start server
      server = app.listen(process.env.PORT, () => {
        console.log(`SERVER UP ON ${process.env.PORT}`);
        return resolve();
      });
    })
      .then(() => mongoose.connect(process.env.MONGODB_URI));
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      // is server already off?
      if(!server) return reject(new Error('SERVER ALREADY OFF'));

      server.close(() => {
        server = null;
        console.log('SERVER OFF');
        return resolve();
      });
    })
      .then(() => mongoose.disconnect());
  },
};