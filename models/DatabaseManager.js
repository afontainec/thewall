const DEFAULT_NAME = 'thewall_access';
let knex;


const init = async (config) => {
  setKnex(config);
  const exists = await isTableCreated();
  return exists ? true : createTable();
};

const setKnex = (config) => {
  if (!config || !config.knex) throw new Error('No knex set. A given knex must be given');
  knex = require(config.knex); // eslint-disable-line import/no-dynamic-require, global-require
};

const isTableCreated = async () => {
  const query = knex('information_schema.tables').select('*').where('table_name', DEFAULT_NAME).and('table_schema', 'schema_name');
  const results = await query;
  return results.length > 0;
};

const createTable = async () => {
  const query = knex.raw(`CREATE TABLE ${DEFAULT_NAME} (id SERIAL, user_id INTEGER, role TEXT)`);
  return query;
};
