process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');

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
    verb: 'get',
  }],
  b: [{
    path: '/b',
    filter: undefined,
    verb: 'get',
  }, {
    path: '/b/b',
    filter: undefined,
    verb: 'get',
  }],
};

describe('set Access', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('parse all entries', (done) => { // eslint-disable-line no-undef
    main.flushAccessList();
    const list = main.setAccess(input);
    assert.deepEqual(list, expected);
    done();
  });

  it('input has empty role', (done) => { // eslint-disable-line no-undef
    main.flushAccessList();
    const list = main.setAccess({});
    assert.deepEqual(list, {});
    done();
  });

  it('input is undefined', (done) => { // eslint-disable-line no-undef
    main.flushAccessList();
    input.b = undefined;
    delete expected.b;
    const list = main.setAccess(input);
    assert.deepEqual(list, expected);
    done();
  });


});
