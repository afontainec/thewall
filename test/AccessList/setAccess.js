process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();

const input = {
  a: [['/a/:a', 'a', 'get'], 'a/:a/b'],
  b: ['/b', '/b/b'],
};
const expected = {
  a: [{
    path: '/a/:a',
    filter: 'a',
    verb: 'get',
  }, {
    path: 'a/:a/b',
    filter: undefined,
    verb: 'all',
  }],
  b: [{
    path: '/b',
    filter: undefined,
    verb: 'all',
  }, {
    path: '/b/b',
    filter: undefined,
    verb: 'all',
  }],
};

describe('set List', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('parse all entries', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    const list = accessList.setAccessList(input);
    assert.deepEqual(list, expected);
    done();
  });

  it('input has empty role', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    const list = accessList.setAccessList({});
    assert.deepEqual(list, {});
    done();
  });

  it('input is undefined', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    input.b = undefined;
    delete expected.b;
    const list = accessList.setAccessList(input);
    assert.deepEqual(list, expected);
    done();
  });

  it('input is not an array', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    const list = accessList.setAccessList({
      other: '/*',
    });
    assert.deepEqual(list, {
      other: [{
        path: '/*',
        verb: 'all',
        filter: undefined,
      }],
    });
    done();
  });


});
