process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;
let knex;

describe('Database Manager: addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    knex = databaseManager.getKnex();
    await databaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await databaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const results = await databaseManager.table().select('*').where('user_id', 1);
    assert.equal(results.length, 1);
    assert.equal(results[0].role, 'test_role');
  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    const before = await knex(databaseManager.DEFAULT_NAME).count('*');
    await databaseManager.addAccess();
    const after = await knex(databaseManager.DEFAULT_NAME).count('*');
    assert.deepEqual(before, after);
  });

});
