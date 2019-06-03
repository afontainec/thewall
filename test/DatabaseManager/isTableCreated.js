process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');


describe('is Table Created', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    DatabaseManager.setKnex(config);
    const results = await DatabaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
    if (results.rows.length > 0) await DatabaseManager.getKnex().raw(`DROP TABLE ${DatabaseManager.DEFAULT_NAME}`);
  });

  it('it is not created', async () => { // eslint-disable-line no-undef
    const exists = await DatabaseManager.isTableCreated();
    assert.equal(exists, false);
  });

  it('it is created', async () => { // eslint-disable-line no-undef
    await DatabaseManager.getKnex().raw(`CREATE TABLE ${DatabaseManager.DEFAULT_NAME} (id SERIAL)`);
    const exists = await DatabaseManager.isTableCreated();
    assert.equal(exists, true);
  });

});
