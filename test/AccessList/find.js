process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const expected = {
  role: {
    path: '/path/to',
    verb: 'all',
    filter: undefined,
  },
  other: {
    path: '/*',
    verb: 'all',
    filter: undefined,
  },
};

describe('AccessList.find', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('list is null', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    const entry = AccessList.find('/path/to', 'get');
    assert.deepEqual(entry, {});
    done();
  });

  it('Happy path', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    AccessList.setAccessList({
      role: ['other', ['/path/to', undefined, 'put'], '/path/to'],
      other: '/*',
      no: '/no/no',
    });
    const access = AccessList.find('/path/to', 'get');
    assert.deepEqual(access, expected);
    done();
  });


});
