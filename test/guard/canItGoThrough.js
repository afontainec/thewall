process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');
const DatabaseManager = require('../../models/DatabaseManager');
const config = require('../../config');

let databaseManager;
let guard;


describe('can it go through', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    databaseManager = await new DatabaseManager(config);
    await databaseManager.flushAccess();
    await databaseManager.addAccess({ user_id: 1, role: 'venue', filter: '10' });
    await databaseManager.addAccess({ user_id: 2, role: 'admin' });
    guard = new Guard(databaseManager);
  });

  it('has filter', async () => { // eslint-disable-line no-undef
    const entries = {
      admin: {
        path: '*',
      },
      venue: {
        path: '/places/:id',
        filter: 'id',
      },
    };
    const hasAccess = await guard.canItGoThrough(1, '/places/10', entries);
    assert.isTrue(hasAccess);
  });

  it('has different filter', async () => { // eslint-disable-line no-undef
    const entries = {
      admin: {
        path: '*',
      },
      venue: {
        path: '/places/:id',
        filter: 'id',
      },
    };
    const hasAccess = await guard.canItGoThrough(1, '/places/11', entries);
    assert.isFalse(hasAccess);
  });

  it('without filter', async () => { // eslint-disable-line no-undef
    const entries = {
      admin: {
        path: '*',
      },
      venue: {
        path: '/places/:id',
        filter: 'id',
      },
    };
    const hasAccess = await guard.canItGoThrough(2, '/places/13', entries);
    assert.isTrue(hasAccess);
  });

  it('entries is null', async () => { // eslint-disable-line no-undef
    const hasAccess = await guard.canItGoThrough(3, '/places/13');
    assert.isTrue(hasAccess);
  });

  it('entries is empty', async () => { // eslint-disable-line no-undef
    const hasAccess = await guard.canItGoThrough(3, '/places/13', []);
    assert.isTrue(hasAccess);
  });

});
