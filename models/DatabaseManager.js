const DEFAULT_NAME = 'thewall_access';
let knex;


// INITIALIZE
const init = async (config) => {
  setKnex(config);
  const exists = await isTableCreated();
  return exists ? true : createTable();
};

const createTable = async () => {
  const query = knex.raw(`CREATE TABLE ${DEFAULT_NAME} (id SERIAL, user_id INTEGER, role TEXT, filter TEXT)`);
  return query;
};

const isTableCreated = async () => {
  const query = knex.select('*').from('information_schema.tables').where('table_name', DEFAULT_NAME);
  const results = await query;
  return results.length > 0;
};

const getKnex = () => {
  return knex;
};

const setKnex = (config) => {
  if (!config || !config.knex) throw new Error('No knex set. A given knex must be given');
  knex = require(config.knex); // eslint-disable-line import/no-dynamic-require, global-require
};

// CRUD ACCESS

const addAccess = async (access) => {
  return access ? knex(DEFAULT_NAME).insert(access) : true;
};

const removeAccess = async (access) => {
  return access ? knex(DEFAULT_NAME).del().where(access) : true;
};

const hasAccess = async (userId, roles) => {
  const results = await knex(DEFAULT_NAME).select('*').where('user_id', userId).andWhere('role', 'in', roles);
  return results.length > 0;
};

const flushAccess = async () => {
  return knex(DEFAULT_NAME).del();
};


const publicMethods = {
  init,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.addAccess = addAccess;
  publicMethods.removeAccess = removeAccess;
  publicMethods.hasAccess = hasAccess;
  publicMethods.flushAccess = flushAccess;

  publicMethods.createTable = createTable;
  publicMethods.isTableCreated = isTableCreated;
  publicMethods.setKnex = setKnex;
  publicMethods.getKnex = getKnex;
  publicMethods.DEFAULT_NAME = DEFAULT_NAME;
}

module.exports = publicMethods;
