process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();

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

describe('accessList.find', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('list is null', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    const entry = accessList.find('/path/to', 'get');
    assert.deepEqual(entry, {});
    done();
  });

  it('Happy path', (done) => { // eslint-disable-line no-undef
    accessList.flush();
    accessList.setAccessList({
      role: ['other', ['/path/to', undefined, 'put'], '/path/to'],
      other: '/*',
      no: '/no/no',
    });
    const access = accessList.find('/path/to', 'get');
    assert.deepEqual(access, expected);
    done();
  });


});
