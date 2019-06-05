process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const input = {
  a: [['/a/:a', 'a', 'get'], 'a/:a/b'],
  b: ['/b', '/b/b'],
};

describe('set List', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('roles is undefined', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    const roles = AccessList.getRoles();
    assert.deepEqual(roles, []);
    done();
  });

  it('roles is undefined', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    AccessList.setAccessList(input);

    const roles = AccessList.getRoles();
    assert.deepEqual(roles, ['a', 'b']);
    done();
  });


});
