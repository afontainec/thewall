const AccessList = require('./models/AccessList');
const Guard = require('./models/guard');
const config = require('./config');
const DatabaseManager = require('./models/DatabaseManager');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = AccessList.find(url, verb);
  return Guard.canItGoThrough(userId, url, entries);
};

const addAccess = async (userId, role, filter) => {
  if (!userId || !role) return Promise.reject(new Error('No user_id and/or role defined'));
  const access = {
    user_id: userId,
    role,
  };
  if (filter) access.filter = filter;
  return DatabaseManager.addAccess(access);
};


const initialize = () => {
  AccessList.init(config.access);
  DatabaseManager.init(config);
};

// GET ROLE


module.exports = {
  addAccess,
  findAccess: DatabaseManager.findAccess,
  updateAccess: DatabaseManager.updateAccess,
  delete: DatabaseManager.delete,

  hasAccess,
  initialize,
};


initialize();
