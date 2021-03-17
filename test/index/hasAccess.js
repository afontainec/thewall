process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');
const TheWallConstructor = require('../..');

let TheWall;
let databaseManager;


describe('Index.hasAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    TheWall = TheWallConstructor(config);
    await databaseManager.flushAccess();
    await databaseManager.addAccess({ user_id: 1, role: 'venue', filter: '10' });
    await databaseManager.addAccess({ user_id: 2, role: 'admin' });
  });

  it('has access', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(1, '/places/10', 'get');
    assert.isTrue(hasAccess);
  });

  it('has access, uppercase', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(1, '/PLACES/10', 'GET');
    assert.isTrue(hasAccess);
  });

  it('has no access', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess(1, '/places/11', 'get');
    assert.isFalse(hasAccess);
  });

  it('no restriction set', async () => { // eslint-disable-line no-undef
    const { admin } = TheWall.accessList.get();
    delete TheWall.accessList.get().admin;
    const hasAccess = await TheWall.hasAccess(10, '/open/to/everyone', 'get');
    TheWall.accessList.get().admin = admin;
    assert.isTrue(hasAccess);
  });

  it('empty params', async () => { // eslint-disable-line no-undef
    const hasAccess = await TheWall.hasAccess();
    assert.isTrue(hasAccess);
  });

});
