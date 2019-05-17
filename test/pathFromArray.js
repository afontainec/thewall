process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');


describe('path from entry', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entry is not array', (done) => { // eslint-disable-line no-undef
    const p = main.pathFromEntry('/path/to');
    assert.equal(p, '/path/to');
    done();
  });

  it('entry is array', (done) => { // eslint-disable-line no-undef
    const p = main.pathFromEntry(['/path/to']);
    assert.equal(p, '/path/to');
    done();
  });


});
