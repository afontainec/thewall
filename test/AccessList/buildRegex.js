process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');


describe('buildRegex', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('has :', (done) => { // eslint-disable-line no-undef
    const comparison = AccessList.buildRegex('/places/:id/metrics');
    assert.equal(comparison, '^/places/[^\\/]*/metrics/$');
    done();
  });

  it('has *', (done) => { // eslint-disable-line no-undef
    const comparison = AccessList.buildRegex('/places/*/metrics');
    assert.equal(comparison, '^/places/.*/metrics/$');
    done();
  });


  it('has no * nor :', (done) => { // eslint-disable-line no-undef
    const comparison = AccessList.buildRegex('/places/some/metrics');
    assert.equal(comparison, '^/places/some/metrics/$');
    done();
  });

  it('input is undefined', (done) => { // eslint-disable-line no-undef
    const comparison = AccessList.buildRegex();
    assert.equal(comparison, undefined);
    done();
  });


});
