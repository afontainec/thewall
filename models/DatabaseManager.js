const DEFAULT_NAME = 'thewall_access';
let knex;


const init = async (config) => {
  setKnex(config);
  const exists = await isTableCreated();
  return exists ? true : createTable();
};

const createTable = async () => {
  const query = knex.raw(`CREATE TABLE ${DEFAULT_NAME} (id SERIAL, user_id INTEGER, roles TEXT [])`);
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


const publicMethods = {
  init,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.createTable = createTable;
  publicMethods.isTableCreated = isTableCreated;
  publicMethods.setKnex = setKnex;
  publicMethods.getKnex = getKnex;
  publicMethods.DEFAULT_NAME = DEFAULT_NAME;
}

module.exports = publicMethods;
