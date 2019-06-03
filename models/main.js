const AccessList = require('./AccessList');
const config = require('../config');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = AccessList.find(url, verb);
  const roles = Object.keys(entries);
  if (roles.length === 0) return true; // if its not restricted then its open to everyone
  // const results = await knex('table').select('*').where('user_id', userId).andWhere('role', 'in', roles);
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
