process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;


describe('addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    await databaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await databaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const input = await databaseManager.findAccess({ role: 'test_role' });
    await databaseManager.updateAccess({ id: input[0].id }, { filter: 'filtering' });
    const results = await databaseManager.findAccess({ filter: 'filtering' });
    assert.equal(results.length, 1);
    assert.equal(results[0].user_id, 1);
    assert.equal(results[0].role, 'test_role');

  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    const results = await databaseManager.updateAccess();
    assert.deepEqual(results, []);
  });

});
