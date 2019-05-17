const AccessList = require('./AccessList');
const config = require('../config');


// //// Has Access


const hasAccess = async (userId, url, verb) => {
  const entries = getMatchingAccess(url, verb);
  // const roles = extractRoles(entries);
  // if (roles.length === 0) return true;
  // const results = await knex('table').select('*').where('user_id', userId).andWhere('role', 'in', roles);
  // return hasCorrectFilter(results, filters);
};

// GET ROLE


if (process.env.NODE_ENV === 'test') {
  module.exports = {
    hasAccess,
  };
} else {
  AccessList.init(config);
}
