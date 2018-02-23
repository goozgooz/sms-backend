'use strict';

import express from 'express';

// server and server state
const app = express();
let serverOn = null; //TODO- change this to just server... becuase on the stop functino it needs to read server.close (not app.close)

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
  //TODO: fire up MongoDB here later
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    // is server already off?
    if(!serverOn) return reject(new Error('SERVER ALREADY OFF'));

    app.close(() => {  // make this say server.close
      serverOn = null;
      console.log('SERVER OFF');
      return resolve();
    });
  });
  //TODO turn off mongoDB later
};
