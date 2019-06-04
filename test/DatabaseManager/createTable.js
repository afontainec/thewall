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

  it('it is created', (done) => { // eslint-disable-line no-undef
    DatabaseManager.createTable().then(() => {
      done('IT SHOULD NOT GET HERE');
    }).catch((err) => {
      assert.equal(err.message, 'CREATE TABLE thewall_access (id SERIAL, user_id INTEGER, role TEXT, filter TEXT) - relation "thewall_access" already exists');
      done();
    });
  });

});
