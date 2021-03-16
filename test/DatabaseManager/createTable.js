process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;

describe('created', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    databaseManager.setKnex(config);
    const results = await databaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${databaseManager.DEFAULT_NAME}'`);
    if (results.rows.length > 0) await databaseManager.getKnex().raw(`DROP TABLE ${databaseManager.DEFAULT_NAME}`);
  });

  it('it is not created', async () => { // eslint-disable-line no-undef
    await databaseManager.createTable();
    const results = await databaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${databaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

  it('it is created', async () => { // eslint-disable-line no-undef
    await databaseManager.table().insert({ user_id: 1 });
    await databaseManager.createTable();
    const results = await databaseManager.table().count('*');
    assert.equal(results[0].count, 1);
  });

});
