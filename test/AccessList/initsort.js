process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const AccessList = require('../../models/AccessList');

const input = {
  a: [
    ['/aaaaa/:param', 'param', 'get'],
    '/bbbbb/other/show',
    ['/ccccc/:id/test', 'id', 'get'],
  ],
  b: [
    ['/a/:id/show'],
    '/b',
    '/c/b',
  ],
};

// const expected = {
//   a:
//   ['/bbbbb/other/show',
//     ['/ccccc/:id/test', 'id', 'get'],
//     ['/aaaaa/:param', 'param', 'get']],
//   b: ['/b',
//     '/c/b',
//     ['/a/:id/show']],
// };

describe('AccessList.js initSort', () => { // eslint-disable-line no-undef, max-lines-per-function

  it('does correct sort (by filter desc)', (done) => { // eslint-disable-line no-undef
    AccessList.flush();
    AccessList.initSort(input);
    assert.isFalse(input.a[0].includes('/:'));
    assert.isFalse(input.b[0].includes('/:'));
    assert.isFalse(input.b[1].includes('/:'));
    // assert.deepEqual(input, expected);
    done();
  });
});
