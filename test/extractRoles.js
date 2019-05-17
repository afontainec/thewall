process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const main = require('../main');


describe('extractRoles', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(() => { // eslint-disable-line no-undef
    main.flushAccessList();
    main.setAccess({
      role: ['/other', '/path/to/yes'],
      other: ['/path/to/*'],
      no: ['/path/to/no'],
    });
  });


  it('Happy path', (done) => { // eslint-disable-line no-undef
    assert.deepEqual(main.extractRoles('/path/to/yes'), ['role', 'other']);
    done();
  });


});
