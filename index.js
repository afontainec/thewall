const AccessList = require('./models/AccessList');
const Guard = require('./models/guard');
const config = require('./config');
const DatabaseManager = require('./models/DatabaseManager');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = AccessList.find(url, verb);
  return Guard.canItGoThrough(userId, url, entries);
};


const initialize = () => {
  AccessList.init(config.access);
  DatabaseManager.init(config);
};

// GET ROLE


module.exports = {
  hasAccess,
  initialize,
};


initialize();
