const AccessList = require('./AccessList');
const Guard = require('./guard');
const config = require('../config');
const DatabaseManager = require('./DatabaseManager');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = AccessList.find(url, verb);
  Guard.canItGoThrough(userId, url, entries);
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
