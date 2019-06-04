process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');
const TheWall = require('../..')(config);


describe('addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    await DatabaseManager.flushAccess();
  });

  it('it is added', async () => { // eslint-disable-line no-undef
    await TheWall.addAccess(1, 'test_role', 'filter');
    const results = await DatabaseManager.table().select('*').where('user_id', 1);
    assert.equal(results.length, 1);
    assert.equal(results[0].role, 'test_role');
    assert.equal(results[0].filter, 'filter');
  });

  it('it is added, no filter', async () => { // eslint-disable-line no-undef
    await TheWall.addAccess(2, 'test_role');
    const results = await DatabaseManager.table().select('*').where('user_id', 2);
    assert.equal(results.length, 1);
    assert.equal(results[0].role, 'test_role');
    assert.equal(results[0].filter, null);
  });

  it('if no userId is given, reject', (done) => { // eslint-disable-line no-undef
    TheWall.addAccess(null, 'role').then(() => {
      done('SHOULD NOT GET HERE');
    }).catch(() => {
      done();
    });
  });

  it('if no role is given, reject', (done) => { // eslint-disable-line no-undef
    TheWall.addAccess(10).then(() => {
      done('SHOULD NOT GET HERE');
    }).catch(() => {
      done();
    });
  });

});
