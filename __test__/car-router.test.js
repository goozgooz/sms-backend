'use strict';

const superagent = require('superagent');

// test .env variables and setup
require('./lib/setup.js');
const server = require('../lib/server.js');
const carMock = require('./lib/car-mock.js');
const apiURL = `http://localhost:${process.env.PORT}`;

describe('car-router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(carMock.remove);

  describe('POST /api/cars', () => {
    test('200', () => {
      return superagent.post(`${apiURL}/api/cars`)
        .send(carMock.bmw)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toBeTruthy();
        });
    });
  });

});

