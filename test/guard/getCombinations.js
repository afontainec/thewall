process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Guard = require('../../models/guard');


const entries = {
  admin: {
    path: '*',
  },
  placeViewer: {
    path: '/place/:id',
    filter: 'id',
  },
};

describe('Get getCombinations', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('entries is empty', (done) => { // eslint-disable-line no-undef
    const combinations = Guard.getCombinations('/place/3');
    assert.deepEqual(combinations, []);
    done();
  });

  it('Happy path', (done) => { // eslint-disable-line no-undef
    const combinations = Guard.getCombinations('/place/3', entries);
    assert.deepEqual(combinations, [['admin'], ['placeViewer', '3']]);
    done();
  });
});
