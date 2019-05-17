process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');


describe('filter from entry', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entry is not array', (done) => { // eslint-disable-line no-undef
    const filter = main.filterFromEntry('/path/to');
    assert.isUndefined(filter);
    done();
  });

  it('entry is array but is too short', (done) => { // eslint-disable-line no-undef
    const filter = main.filterFromEntry(['path/to']);
    assert.isUndefined(filter);
    done();
  });

  it('entry is array but is entry[1] is false', (done) => { // eslint-disable-line no-undef
    const filter = main.filterFromEntry(['/path/to', false]);
    assert.isUndefined(filter);
    done();
  });

  it('entry is array and entry[1] is defined', (done) => { // eslint-disable-line no-undef
    const verb = main.filterFromEntry(['/path/:id', 'id']);
    assert.deepEqual(verb, 'id');
    done();
  });


});
