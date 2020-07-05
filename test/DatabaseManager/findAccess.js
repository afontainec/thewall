process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');


describe('addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    await DatabaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await DatabaseManager.addAccess({ user_id: 1, role: 'test_role' });
    const results = await DatabaseManager.findAccess({ role: 'test_role' });
    assert.equal(results.length, 1);
    assert.equal(results[0].user_id, 1);
  });

  it('input is null, nothing happens', async () => { // eslint-disable-line no-undef
    const results = await DatabaseManager.findAccess();
    assert.deepEqual(results, []);
  });

});
