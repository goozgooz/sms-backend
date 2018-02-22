'use strict';

import express from 'express';

const app = express();
let serverOn = null;

export const start = () => {
  return new Promise((resolve, reject) => {
    if(serverOn) return reject(new Error('SERVER ALREADY RUNNING'));

    serverOn = app.listen(process.env.PORT, () => {
      console.log(`SERVER UP ON ${process.env.PORT}`);
      return resolve();
    });
  });
};