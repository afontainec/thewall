process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');

describe('addAccess', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
    await DatabaseManager.flushAccess();
    await DatabaseManager.addAccess({ user_id: 1, role: 'test_role' });
  });

  it('exists', async () => { // eslint-disable-line no-undef
    const hasAccess = await DatabaseManager.hasAccess(1, ['other', 'test_role']);
    assert.isTrue(hasAccess);
  });

  it('different user id', async () => { // eslint-disable-line no-undef
    const hasAccess = await DatabaseManager.hasAccess(2, ['other', 'test_role']);
    assert.isFalse(hasAccess);
  });

  it('not in roles', async () => { // eslint-disable-line no-undef
    const hasAccess = await DatabaseManager.hasAccess(1, ['other']);
    assert.isFalse(hasAccess);
  });

});
