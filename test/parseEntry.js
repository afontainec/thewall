process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../models/AccessList');


describe('parse entry', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(() => { // eslint-disable-line no-undef
    AccessList.flush();
  });

  it('access and role are undef', (done) => { // eslint-disable-line no-undef
    AccessList.parseEntry('role', ['/path', 'id', 'get']);
    const list = AccessList.get();
    assert.isDefined(list);
    assert.isDefined(list.role);
    assert.equal(list.role.length, 1);
    assert.equal(list.role[0].path, '/path');
    assert.equal(list.role[0].filter, 'id');
    assert.equal(list.role[0].verb, 'get');
    done();
  });

  it('access and role are def', (done) => { // eslint-disable-line no-undef
    AccessList.parseEntry('role', ['/path/two', 'id', 'get']);
    const list = AccessList.get();
    assert.isDefined(list);
    assert.isDefined(list.role);
    assert.equal(list.role.length, 2);
    assert.equal(list.role[1].path, '/path/two');
    assert.equal(list.role[1].filter, 'id');
    assert.equal(list.role[1].verb, 'get');
    done();
  });


});
