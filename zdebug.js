const path = require('path');
const TheWall = require('.');

const thewall = new TheWall({
  access: {
    storeOwner: [
      ['/store/:id/*', 'id'],
    ],
    everyStoreViewer: [
      '/store/*/view',
    ],
  },
  knex: path.join(__dirname, 'knex.js'),
});


thewall.hasAccess(3, '/store/10/view', 'GET').then((r) => {
  console.log(r);
}).catch((err) => {
  console.log(err);
});

// thewall.addAccess(4, 'everyStoreViewer').then((r) => {
//   console.log(r);
// }).catch((err) => {
//   console.log(err);
// });
