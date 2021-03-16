process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;


describe('init', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    databaseManager.setKnex(config);
    await databaseManager.getKnex().raw(`DROP TABLE IF EXISTS ${databaseManager.DEFAULT_NAME}`);
  });

  it('table it is not created', async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    await wait(100);
    const results = await databaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${databaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

  it('it is created', async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    await wait(100);
    const results = await databaseManager.getKnex().raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${databaseManager.DEFAULT_NAME}'`);
    assert.equal(results.rows.length, 1);
  });

});


const wait = function waitFor(ms) {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  }));
};
