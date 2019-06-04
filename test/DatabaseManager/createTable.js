process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');


describe('created', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    DatabaseManager.setKnex(config);
    const results = await DatabaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
    if (results.rows.length > 0) await DatabaseManager.getKnex().raw(`DROP TABLE ${DatabaseManager.DEFAULT_NAME}`);
  });

  it('it is not created', async () => { // eslint-disable-line no-undef
    await DatabaseManager.createTable();
    const results = await DatabaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

  it('it is created', async () => { // eslint-disable-line no-undef
    await DatabaseManager.table().insert({ user_id: 1 });
    await DatabaseManager.createTable();
    const results = await DatabaseManager.table().count('*');
    assert.equal(results[0].count, 1);
  });

});
