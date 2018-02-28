'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// routes
const carRoutes = require('../routes/car-router.js');

// server and server state
const app = express();
let serverOn = null;

// middleware and routes
app.use(morgan('dev'));
app.use(carRoutes);

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      // is server already running?
      if(serverOn) return reject(new Error('SERVER ALREADY RUNNING'));

      // if server off -> start server
      serverOn = app.listen(process.env.PORT, () => {
        console.log(`SERVER UP ON ${process.env.PORT}`);
        return resolve();
      });
    })
      .then(() => mongoose.connect(process.env.MONGODB_URI));
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      // is server already off?
      if(!serverOn) return reject(new Error('SERVER ALREADY OFF'));

      app.close(() => {
        serverOn = null;
        console.log('SERVER OFF');
        return resolve();
      });
    })
      .then(() => mongoose.disconnect());
  },
};