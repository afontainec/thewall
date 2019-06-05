process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');


describe('path from entry', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entry is not array', (done) => { // eslint-disable-line no-undef
    const p = AccessList.pathFromEntry('/path/to');
    assert.equal(p, '/path/to');
    done();
  });

  it('entry is array', (done) => { // eslint-disable-line no-undef
    const p = AccessList.pathFromEntry(['/path/to']);
    assert.equal(p, '/path/to');
    done();
  });

  it('entry is empty array', (done) => { // eslint-disable-line no-undef
    const p = AccessList.pathFromEntry([]);
    assert.equal(p, undefined);
    done();
  });

  it('entry is uppercase array', (done) => { // eslint-disable-line no-undef
    const p = AccessList.pathFromEntry(['/PATH/TO']);
    assert.equal(p, '/path/to');
    done();
  });


});
