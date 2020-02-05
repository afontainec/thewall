process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');


describe('find in role', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('list is null', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    const entry = AccessList.findInRole('role', '/path/to', 'get');
    assert.isNull(entry);
    done();
  });

  it('list is defined but list[role] is not', (done) => { // eslint-disable-line no-undef
    AccessList.setAccessList({});
    const entry = AccessList.findInRole('role', '/path/to', 'get');
    assert.isNull(entry);
    done();
  });

  it('return correct, not there is one with the same path, other with the same verb but only one that matches both', (done) => { // eslint-disable-line no-undef
    AccessList.setAccessList({
      role: ['other', ['/path/to', undefined, 'put'], '/path/to'],
    });
    const expected = {
      path: '/path/to',
      verb: 'all',
      filter: undefined,
    };
    const entry = AccessList.findInRole('role', '/path/to', 'get');
    assert.deepEqual(entry, expected);
    done();
  });

  it('searched is not present', (done) => { // eslint-disable-line no-undef
    AccessList.setAccessList({
      role: ['other', ['/path/to', 'put'], '/path/to'],
    });
    const entry = AccessList.findInRole('role', '/path/to/other', 'get');
    assert.isNull(entry);
    done();
  });

  it('filter and obsolute route does not overlap', (done) => { // eslint-disable-line no-undef
    AccessList.setAccessList({
      role: [
        '/route/obsolute/without/filter',
        ['/route/:some_id', 'some_id', 'get'],
        '/path/to',
      ],
    });
    const entry = AccessList.findInRole('role', '/route/obsolute/without/filter', 'get');
    assert.equal(entry.path, '/route/obsolute/without/filter');
    done();
  });
  it('filter and obsolute route does not overlap diferent order in Role List', (done) => { // eslint-disable-line no-undef
    AccessList.setAccessList({
      role: [
        ['/route/:some_id', 'some_id', 'get'],
        '/route/obsolute/without/filter',
        '/path/to',
      ],
    });
    const entry = AccessList.findInRole('role', '/route/obsolute/without/filter', 'get');
    assert.equal(entry.path, '/route/obsolute/without/filter');
    done();
  });
});
