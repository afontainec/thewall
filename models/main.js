const AccessList = require('./AccessList');
const config = require('../config');
const DatabaseManager = require('./DatabaseManager');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = AccessList.find(url, verb);
  const roles = Object.keys(entries);
  if (roles.length === 0) return true; // if its not restricted then its open to everyone
  return DatabaseManager.hasAccess(userId, roles);
  // return hasCorrectFilter(results, filters);
};


const initialize = () => {
  AccessList.init(config);
  DatabaseManager.init();
};

// GET ROLE


if (process.env.NODE_ENV === 'test') {
  module.exports = {
    hasAccess,
  };
} else {
  AccessList.init(config);
}
