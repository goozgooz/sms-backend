'use strict';

import express from 'express';

// server and server state
const app = express();
let serverOn = null;

export const start = () => {
  return new Promise((resolve, reject) => {
    // is server already running?
    if(serverOn) return reject(new Error('SERVER ALREADY RUNNING'));

    // if server off -> start server
    serverOn = app.listen(process.env.PORT, () => {
      console.log(`SERVER UP ON ${process.env.PORT}`);
      return resolve();
    });
  });
  // fire up MongoDB here later
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    // is server already off?
    if(!serverOn) return reject(new Error('SERVER ALREADY OFF'));

    app.close(() => {
      serverOn = null;
      console.log('SERVER OFF');
      return resolve();
    });
  });
  // turn off mongoDB later
};