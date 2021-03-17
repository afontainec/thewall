process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();

const input = {
  a: [
    ['route/:param', 'param', 'get'],
    'route/other/show',
    ['/api/:id/test', 'id', 'get'],
  ],
  b: [
    ['b/:id/show', undefined, 'get'],
    'b',
    '/b/b',
  ],
};

const expected = {
  a: [
    ['/route/:param', 'param', 'get'],
    '/route/other/show',
    ['/api/:id/test', 'id', 'get']],
  b: [
    ['/b/:id/show', undefined, 'get'],
    '/b',
    '/b/b'],
};

describe('accessList.js insertSlashIfNeeded', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('work as expected', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    accessList.insertSlashIfNeeded(input);
    assert.deepEqual(input, expected);
    done();
  });
});
