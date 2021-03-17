process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();

describe('buildRegex', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('has :', (done) => { // eslint-disable-line no-undef
    const comparison = accessList.buildRegex('/places/:id/metrics');
    assert.equal(comparison, '^/places/[^\\/]*/metrics/$');
    done();
  });

  it('has *', (done) => { // eslint-disable-line no-undef
    const comparison = accessList.buildRegex('/places/*/metrics');
    assert.equal(comparison, '^/places/.*/metrics/$');
    done();
  });


  it('has no * nor :', (done) => { // eslint-disable-line no-undef
    const comparison = accessList.buildRegex('/places/some/metrics');
    assert.equal(comparison, '^/places/some/metrics/$');
    done();
  });

  it('input is undefined', (done) => { // eslint-disable-line no-undef
    const comparison = accessList.buildRegex();
    assert.equal(comparison, undefined);
    done();
  });


});
