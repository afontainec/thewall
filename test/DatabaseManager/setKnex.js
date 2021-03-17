/* global describe, before, it */
process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

let databaseManager;

describe('Database Manager: addAccess', () => { // eslint-disable-line max-lines-per-function

  before(async () => {
    databaseManager = await new DatabaseManager(config);
    await databaseManager.flushAccess();
  });

  it('happy path', async () => {
    databaseManager = await new DatabaseManager(config);
    assert.exists(databaseManager.knex);
  });

  it('config does not have knex', () => {
    try {
      databaseManager = new DatabaseManager({});
    } catch (error) {
      assert.equal(error.message, 'No knex set. A given knex must be given');
    }
  });

  it(' no config does', () => {
    try {
      databaseManager = new DatabaseManager();
    } catch (error) {
      assert.equal(error.message, 'No knex set. A given knex must be given');
    }
  });

});
