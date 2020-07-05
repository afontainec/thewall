process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let knex;

describe('Database Manager: addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    await wait(100);
    knex = DatabaseManager.getKnex();
    await DatabaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await DatabaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const results = await DatabaseManager.table().select('*').where('user_id', 1);
    assert.equal(results.length, 1);
    assert.equal(results[0].role, 'test_role');
  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    const before = await knex(DatabaseManager.DEFAULT_NAME).count('*');
    await DatabaseManager.addAccess();
    const after = await knex(DatabaseManager.DEFAULT_NAME).count('*');
    assert.deepEqual(before, after);
  });

});


const wait = function waitFor(ms) {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  }));
};
