process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();


describe('filter from entry', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entry is not array', (done) => { // eslint-disable-line no-undef
    const filter = accessList.filterFromEntry('/path/to');
    assert.isUndefined(filter);
    done();
  });

  it('entry is array but is too short', (done) => { // eslint-disable-line no-undef
    const filter = accessList.filterFromEntry(['path/to']);
    assert.isUndefined(filter);
    done();
  });

  it('entry is array but is entry[1] is false', (done) => { // eslint-disable-line no-undef
    const filter = accessList.filterFromEntry(['/path/to', false]);
    assert.isUndefined(filter);
    done();
  });

  it('entry is array and entry[1] is defined', (done) => { // eslint-disable-line no-undef
    const verb = accessList.filterFromEntry(['/path/:id', 'id']);
    assert.deepEqual(verb, 'id');
    done();
  });

  it('filter is in uppercase', (done) => { // eslint-disable-line no-undef
    const verb = accessList.filterFromEntry(['/path/:id', 'ID']);
    assert.deepEqual(verb, 'id');
    done();
  });


});
