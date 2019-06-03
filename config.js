const path = require('path');

module.exports = {
  access: {
    admin: ['*'],
    venue: [
      ['/places/:id', 'id'],
      '/places',
      ['places/:id/report', 'id'],
    ],
    sponsorSubAdmin: [
      '/sponsorship/*',
      '/leads/*',
    ],
    advertiser: [
      ['/sponsorship/:id/*', 'id'],
      ['/sponsorship/:id/*', 'id', 'put'],
      ['/sponsorship/:id/*', 'id', 'patch'],
      ['/leads/:id/*', 'id'],
    ],
  },
  knex: path.join(process.cwd(), 'knex.js'),
};
