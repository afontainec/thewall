process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');
const config = require('../../config');
const DatabaseManager = require('../../models/DatabaseManager');


describe('buildQuery', () => { // eslint-disable-line no-undef, max-lines-per-function

  before(async () => { // eslint-disable-line no-undef
    await DatabaseManager.init(config);
  });
  it('validCombinations is null', (done) => { // eslint-disable-line no-undef
    const query = Guard.buildQuery(1);
    assert.deepEqual('select * from "thewall_access"', query.toString());
    done();
  });

  it('happy path, ', (done) => { // eslint-disable-line no-undef
    const validCombinations = [
      ['placeViewer', '3'],
      ['admin'],
      [],
    ];
    const query = Guard.buildQuery(1, validCombinations);
    let expected = 'select * from "thewall_access"';
    expected += ' where ("role" = \'placeViewer\' and "filter" = \'3\' and "user_id" = 1)';
    expected += ' or ("role" = \'admin\' and "user_id" = 1)';
    expected += ' or 1 = 0';
    assert.deepEqual(expected, query.toString());
    done();
  });
});
