/* global describe, before, it */
process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');
const TheWall = require('../..')(config);

let databaseManager;

describe('getRoles', () => { // eslint-disable-line max-lines-per-function

  before(async () => { // eslint-disable-line
    databaseManager = await new DatabaseManager(config);
    await databaseManager.flushAccess();
  });

  it('happy path', async () => { // eslint-disable-line
    const roles = TheWall.getRoles();
    const expected = ['admin', 'venue', 'sponsorSubAdmin', 'advertiser'];
    assert.deepEqual(roles, expected);
  });

});
