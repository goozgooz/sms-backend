'use strict';

require('./lib/setup.js');
const server = require('../lib/server.js');

describe('server', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('server already running', () => {
    test('should reject', () => {
      server.start()
        .catch(err => {
          expect(err.message).toBe('SERVER ALREADY RUNNING');
        });
    });
  });
});
