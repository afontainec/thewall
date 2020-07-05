process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');


describe('verbFromEntry', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entry is not array', (done) => { // eslint-disable-line no-undef
    const verb = AccessList.verbFromEntry('/path/to');
    assert.deepEqual(verb, 'all');
    done();
  });

  it('entry is array but is too short', (done) => { // eslint-disable-line no-undef
    const verb = AccessList.verbFromEntry([]);
    assert.deepEqual(verb, 'all');
    done();
  });

  it('entry is array but is entry[2] is false', (done) => { // eslint-disable-line no-undef
    const verb = AccessList.verbFromEntry(['/path/to', '', false]);
    assert.deepEqual(verb, 'all');
    done();
  });

  it('entry is array and entry[2] is defined', (done) => { // eslint-disable-line no-undef
    const verb = AccessList.verbFromEntry(['/path/to', '', 'put']);
    assert.deepEqual(verb, 'put');
    done();
  });

  it('verb is in uppercase', (done) => { // eslint-disable-line no-undef
    const verb = AccessList.verbFromEntry(['/path/to', '', 'PUT']);
    assert.deepEqual(verb, 'put');
    done();
  });


});
