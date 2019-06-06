const AccessList = require('./models/AccessList');
const Guard = require('./models/guard');
const DatabaseManager = require('./models/DatabaseManager');


// //// Has Access

module.exports = function initialize(config) {
  AccessList.init(config.access);
  DatabaseManager.init(config);
  return {
    addAccess,
    findAccess: DatabaseManager.findAccess,
    updateAccess: DatabaseManager.updateAccess,
    deleteAccess: DatabaseManager.deleteAccess,
    getRoles: AccessList.getRoles,
    hasAccess,
    initialize,
  };
};


const hasAccess = async (userId, url, verb) => {
  if (url) url = url.toLowerCase();
  if (verb) verb = verb.toLowerCase();
  const entries = AccessList.find(url, verb);
  return Guard.canItGoThrough(userId, url, entries);
};

const addAccess = async (userId, role, filter) => {
  if (!userId || !role) throw new Error('No user_id and/or role defined');
  const access = {
    user_id: userId,
    role,
  };
  if (filter) access.filter = filter;
  return DatabaseManager.addAccess(access);
};
