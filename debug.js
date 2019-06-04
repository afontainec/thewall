const index = require('.');
const AccessList = require('./models/AccessList');
const Guard = require('./models/guard');
const config = require('./config');
const DatabaseManager = require('./models/DatabaseManager');


setTimeout(() => {
  console.log('-------------------------------ESTAMOS');
  const ent = AccessList.find();
  console.log(ent);
}, 1000);
