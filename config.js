// module.exports = {
//   admin: ['*'],
//   venue: [{
//     path: '/places/:id',
//     filter: 'id',
//   }, '/places/'],
// };

module.exports = {
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
};
