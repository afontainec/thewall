process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');
const Guard = require('../../models/guard');


describe('can it go through', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    await DatabaseManager.flushAccess();
    await DatabaseManager.addAccess({ user_id: 1, role: 'venue', filter: '10' });
    await DatabaseManager.addAccess({ user_id: 2, role: 'admin' });
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
    const hasAccess = await Guard.canItGoThrough(1, '/places/10', entries);
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
    const hasAccess = await Guard.canItGoThrough(1, '/places/11', entries);
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
    const hasAccess = await Guard.canItGoThrough(2, '/places/13', entries);
    assert.isTrue(hasAccess);
  });

  it('entries is null', async () => { // eslint-disable-line no-undef
    const hasAccess = await Guard.canItGoThrough(3, '/places/13');
    assert.isTrue(hasAccess);
  });

  it('entries is empty', async () => { // eslint-disable-line no-undef
    const hasAccess = await Guard.canItGoThrough(3, '/places/13', []);
    assert.isTrue(hasAccess);
  });

});
