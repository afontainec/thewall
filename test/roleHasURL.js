process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');


describe('role has URL', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(() => { // eslint-disable-line no-undef
    main.flushAccessList();
    main.setAccessList({
      role: ['/other', '/path/to/yes'],
    });
  });


  it('it has the path', (done) => { // eslint-disable-line no-undef
    assert.isTrue(main.roleHasURL('role', '/path/to/yes'));
    done();
  });

  it('it does not have the path', (done) => { // eslint-disable-line no-undef
    assert.isFalse(main.roleHasURL('role', '/path/to/no'));

    done();
  });


  it('role not present in access', (done) => { // eslint-disable-line no-undef
    assert.isFalse(main.roleHasURL('other', '/path/to/no'));
    done();
  });

});
