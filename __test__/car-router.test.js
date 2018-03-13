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

  let carKeys = Object.keys(carMock.bmw);

  describe('POST /api/cars', () => {
    test('200', () => {
      return superagent.post(`${apiURL}/api/cars`)
        .send(carMock.bmw)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toBeTruthy();
          for(let key of carKeys) {
            expect(res.body.key).toEqual(carMock.bmw.key);
          }
        });
    });

    test('400', () => {
      return superagent.post(`${apiURL}/api/cars`)
        .send({
          cools: 'beans',
          herp: 'derp',
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET /api/cars', () => {
    test('200', () => { 
      carMock.createMany();
      return superagent.get(`${apiURL}/api/cars`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(2);
        });
    });
  });

  describe('GET /api/cars/:id', () => {
    test('200', () => {
      return carMock.create()
        .then(car => {
          return superagent.get(`${apiURL}/api/cars/${car._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          for(let key of carKeys){
            expect(res.body.key).toEqual(carMock.bmw.key);
          }
        });
    });

    test('404', () => {
      return superagent.get(`${apiURL}/api/cars/507f191e810c19729de860ea`)
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/cars/:id', () => {
    test('200', () => {
      return carMock.create()
        .then(car => {
          return superagent.delete(`${apiURL}/api/cars/${car._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    test('404', () => {
      return carMock.create()
        .then(car => {
          return superagent.delete(`${apiURL}/api/cars/507f191e810c19729de860ea`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    test('404', () => {
      return carMock.create()
        .then(car => {
          return superagent.delete(`${apiURL}/api/cars/1234`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  describe('PATCH /api/cars/:id', () => {
    test('200', () => {
      return carMock.create()
        .then(car => {
          return superagent.patch(`${apiURL}/api/cars/${car._id}`)
            .send({make:'tesla', model:'model 3', year:'2018'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.make).toEqual('tesla');
          expect(res.body.model).toEqual('model 3');
          expect(res.body.year).toEqual(2018);
        });
    });

    test('400', () => {
      return carMock.create()
        .then(car => {
          return superagent.patch(`${apiURL}/api/cars/${car._id}`)
            .send({make:''});
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('404', () => {
      return carMock.create()
        .then(car => {
          return superagent.patch(`${apiURL}/api/cars/507f191e810c19729de860ea`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});

