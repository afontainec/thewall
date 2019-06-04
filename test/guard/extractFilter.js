process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');


describe('Extract Filter', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('Correct extraction', (done) => { // eslint-disable-line no-undef
    const filtering = Guard.extractFilter('/places/3/some', '/places/:id/some', 'id');
    assert.equal(filtering, '3');
    done();
  });

  it('url is null', (done) => { // eslint-disable-line no-undef
    done('NOT IMPLEMENTED');
  });

  it('templateUrl is null', (done) => { // eslint-disable-line no-undef
    done('NOT IMPLEMENTED');
  });

  it('templateUrl ends with filter', (done) => { // eslint-disable-line no-undef
    done('NOT IMPLEMENTED');
  });

  it('templateUrl does not contain filter', (done) => { // eslint-disable-line no-undef
    done('NOT IMPLEMENTED');
  });


});
