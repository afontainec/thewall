process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const accessList = new AccessList();

describe('urlMatches', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('has :', (done) => { // eslint-disable-line no-undef
    assert.isTrue(accessList.urlMatches('/places/:id/metrics', '/places/1/metrics'));
    assert.isTrue(accessList.urlMatches('/places/:id/metrics', '/places/2/metrics'));
    assert.isFalse(accessList.urlMatches('/places/:id/metrics', '/place/3'));
    done();
  });

  it('has *', (done) => { // eslint-disable-line no-undef
    assert.isTrue(accessList.urlMatches('/places/*', '/places/some/metrics'));
    assert.isTrue(accessList.urlMatches('/places/*', '/places/3'));
    assert.isFalse(accessList.urlMatches('/places/*', '/place/3'));
    assert.isTrue(accessList.urlMatches('/*', '/place/3'));
    done();
  });


  it('has no * nor :', (done) => { // eslint-disable-line no-undef
    assert.isTrue(accessList.urlMatches('/places/some/metrics', '/places/some/metrics'));
    assert.isFalse(accessList.urlMatches('/places/some/metrics', '/places/other/metrics'));
    done();
  });

  it('comparison is undefined', (done) => { // eslint-disable-line no-undef
    assert.isFalse(accessList.urlMatches(null, '/place/3'));
    done();
  });

  it('url is undefined', (done) => { // eslint-disable-line no-undef
    assert.isFalse(accessList.urlMatches('/*'));
    done();
  });


});
