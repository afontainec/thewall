process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');


describe('urlMatches', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('has :', (done) => { // eslint-disable-line no-undef
    assert.isTrue(main.urlMatches('/places/:id/metrics', '/places/1/metrics'));
    assert.isTrue(main.urlMatches('/places/:id/metrics', '/places/2/metrics'));
    assert.isFalse(main.urlMatches('/places/:id/metrics', '/place/3'));
    done();
  });

  it('has *', (done) => { // eslint-disable-line no-undef
    assert.isTrue(main.urlMatches('/places/*', '/places/some/metrics'));
    assert.isTrue(main.urlMatches('/places/*', '/places/3'));
    assert.isFalse(main.urlMatches('/places/*', '/place/3'));
    assert.isTrue(main.urlMatches('/*', '/place/3'));
    done();
  });


  it('has no * nor :', (done) => { // eslint-disable-line no-undef
    assert.isTrue(main.urlMatches('/places/some/metrics', '/places/some/metrics'));
    assert.isFalse(main.urlMatches('/places/some/metrics', '/places/other/metrics'));
    done();
  });

  it('input is undefined', (done) => { // eslint-disable-line no-undef
    assert.isFalse(main.urlMatches());
    done();
  });


});
