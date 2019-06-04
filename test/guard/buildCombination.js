process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');


describe('buildCombination', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('role is null', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/:id/some',
      filter: 'id',
    };
    const combination = Guard.buildCombination('/places/3/some', null, role);
    assert.deepEqual(combination, []);
    done();
  });

  it('entry is null', (done) => { // eslint-disable-line no-undef
    const combination = Guard.buildCombination('/places/3/some', 'role');
    assert.deepEqual(combination, []);
    done();
  });

  it('entry.filter is null', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/all',
    };
    const combination = Guard.buildCombination('/places/3/some', 'role', role);
    assert.deepEqual(combination, ['role']);
    done();
  });

  it('happy path', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/:id/some',
      filter: 'id',
    };
    const combination = Guard.buildCombination('/places/3/some', 'role', role);
    assert.deepEqual(combination, ['role', '3']);
    done();
  });
});
