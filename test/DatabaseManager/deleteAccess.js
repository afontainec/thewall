process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let knex;

describe('removeAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    knex = DatabaseManager.getKnex();
    await DatabaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await DatabaseManager.addAccess({ user_id: 1, role: 'test_role' });
    await DatabaseManager.deleteAccess({ user_id: 1, role: 'test_role' });
    const results = await knex(DatabaseManager.DEFAULT_NAME).select('*').where('user_id', 1);
    assert.equal(results.length, 0);
  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    await DatabaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const before = await knex(DatabaseManager.DEFAULT_NAME).count('*');
    await DatabaseManager.deleteAccess();
    const after = await knex(DatabaseManager.DEFAULT_NAME).count('*');
    assert.deepEqual(before, after);
  });

});
