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
    const filtering = Guard.extractFilter(null, '/places/:id/some', 'id');
    assert.equal(filtering, null);
    done();
  });

  it('templateUrl is null', (done) => { // eslint-disable-line no-undef
    const filtering = Guard.extractFilter('/places/3/some', null, 'id');
    assert.equal(filtering, null);
    done();
  });

  it('templateUrl ends with filter', (done) => { // eslint-disable-line no-undef
    const filtering = Guard.extractFilter('/places/3', '/places/:id', 'id');
    assert.equal(filtering, '3');
    done();
  });

  it('templateUrl does not contain filter', (done) => { // eslint-disable-line no-undef
    const filtering = Guard.extractFilter('/places/3', '/places/id', 'id');
    assert.equal(filtering, null);
    done();
  });

  it('url is different to templateUrl', (done) => { // eslint-disable-line no-undef
    const filtering = Guard.extractFilter('/other/3', '/places/:id', 'id');
    assert.equal(filtering, null);
    done();
  });


});