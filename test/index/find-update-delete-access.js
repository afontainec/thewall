process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const TheWallConstructor = require('../..');

let TheWall;

describe('working with access', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    TheWall = TheWallConstructor(config);
    await TheWall.databaseManager.flushAccess();

  });

  it('find: it is added', async () => { // eslint-disable-line no-undef
    await TheWall.addAccess(1, 'test_role');
    const results = await TheWall.findAccess({ role: 'test_role' });
    assert.equal(results.length, 1);
    assert.equal(results[0].user_id, 1);
  });

  it('find: input is null, nothing happens', async () => { // eslint-disable-line no-undef
    const results = await TheWall.findAccess();
    assert.deepEqual(results, []);
  });

  it('update: theWall', async () => { // eslint-disable-line no-undef
    await TheWall.updateAccess({ role: 'test_role' }, { user_id: 2 });
    const results = await TheWall.findAccess({ role: 'test_role' });
    assert.equal(results.length, 1);
    assert.equal(results[0].user_id, 2);
  });

  it('delete: theWall', async () => { // eslint-disable-line no-undef
    await TheWall.deleteAccess({ role: 'test_role' });
    const results = await TheWall.findAccess({ role: 'test_role' });
    assert.deepEqual(results, []);
  });

});
