process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const DatabaseManager = require('../../models/DatabaseManager');
const TheWall = require('../..');


describe('Index.hasAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.flushAccess();
    await DatabaseManager.addAccess({ user_id: 1, role: 'venue', filter: '10' });
    await DatabaseManager.addAccess({ user_id: 2, role: 'admin' });
  });

  it('has access', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(1, '/places/10', 'get');
    assert.isTrue(hasAccess);
  });

  it('has no access', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(1, '/places/11', 'get');
    assert.isTrue(hasAccess);
  });

  it('no restriction set', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(10, '/open/to/everyone', 'get');
    assert.isTrue(hasAccess);
  });

  it('empty params', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess();
    assert.isTrue(hasAccess);
  });

});
