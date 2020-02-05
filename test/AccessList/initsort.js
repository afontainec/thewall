process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const input = {
  a: [
    ['/route/:param', 'param', 'get'],
    'route/other/show',
    ['/api/:id/test', 'id', 'get'],
  ],
  b: [
    ['/b/:id/show'],
    '/b',
    '/b/b',
  ],
};

const expected = {
  a: [
    'route/other/show',
    ['/api/:id/test', 'id', 'get'],
    ['/route/:param', 'param', 'get'],
  ],
  b: [
    '/b',
    '/b/b',
    ['/b/:id/show'],
  ],
};

describe('AccessList.js initSort', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('roles is undefined', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    AccessList.initSort(input);
    assert.deepEqual(input, expected);
    done();
  });
});
