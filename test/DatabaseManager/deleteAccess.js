process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;
let knex;

describe('removeAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    knex = databaseManager.getKnex();
    await databaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await databaseManager.addAccess({ user_id: 1, role: 'test_role' });
    await databaseManager.deleteAccess({ user_id: 1, role: 'test_role' });
    const results = await knex(databaseManager.DEFAULT_NAME).select('*').where('user_id', 1);
    assert.equal(results.length, 0);
  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    await databaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const before = await knex(databaseManager.DEFAULT_NAME).count('*');
    await databaseManager.deleteAccess();
    const after = await knex(databaseManager.DEFAULT_NAME).count('*');
    assert.deepEqual(before, after);
  });

});
