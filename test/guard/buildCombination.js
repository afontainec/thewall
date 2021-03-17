process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');
const DatabaseManager = require('../../models/DatabaseManager');
const config = require('../../config');

let databaseManager;
let guard;

describe('buildCombination', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    guard = new Guard(databaseManager);
  });

  it('role is null', (done) => { // eslint-disable-line no-undef

    const role = {
      path: '/places/:id/some',
      filter: 'id',
    };
    const combination = guard.buildCombination('/places/3/some', null, role);
    assert.deepEqual(combination, []);
    done();
  });

  it('entry is null', (done) => { // eslint-disable-line no-undef
    const combination = guard.buildCombination('/places/3/some', 'role');
    assert.deepEqual(combination, []);
    done();
  });

  it('entry.filter is null', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/all',
    };
    const combination = guard.buildCombination('/places/3/some', 'role', role);
    assert.deepEqual(combination, ['role']);
    done();
  });

  it('happy path', (done) => { // eslint-disable-line no-undef
    const role = {
      path: '/places/:id/some',
      filter: 'id',
    };
    const combination = guard.buildCombination('/places/3/some', 'role', role);
    assert.deepEqual(combination, ['role', '3']);
    done();
  });
});
