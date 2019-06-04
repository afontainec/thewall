process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');


describe('Extract Filter', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('role is null', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/:id/other',
      filter: 'id',
    };
    const combination = Guard.buildCombination('/places/3/some', 'role', role);
    done('NOT IMPLEMETED');
  });

  it('entry is null', (done) => { // eslint-disable-line no-undef
    const combination = Guard.buildCombination('/places/3/some', 'role');
    done('NOT IMPLEMETED');
  });

  it('entry.filter is null', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/all',
    };
    const combination = Guard.buildCombination('/places/3/some', 'role', role);
    done('NOT IMPLEMETED');
  });

  it('happy path', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/:id/other',
      filter: 'id',
    };
    const combination = Guard.buildCombination('/places/3/some', 'role', role);
    done('NOT IMPLEMETED');


});
