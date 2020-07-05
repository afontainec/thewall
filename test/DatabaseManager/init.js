process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');


describe('init', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    DatabaseManager.setKnex(config);
    await DatabaseManager.getKnex().raw(`DROP TABLE IF EXISTS ${DatabaseManager.DEFAULT_NAME}`);
  });

  it('table it is not created', async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    const results = await DatabaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

  it('it is created', async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    const results = await DatabaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

});
