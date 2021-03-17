

class DatabaseManager {
  constructor(config) {
    this.DEFAULT_NAME = 'thewall_access';

    this.setKnex(config);
    this.createTable().then().catch(() => {});
  }

  async createTable() {
    const query = this.knex.raw(`CREATE TABLE IF NOT EXISTS ${this.DEFAULT_NAME} (id SERIAL, user_id INTEGER, role TEXT, filter TEXT)`);
    return query;
  }

  getKnex() {
    return this.knex;
  }

  setKnex(config) {
    if (!config || !config.knex) throw new Error('No knex set. A given knex must be given');
    this.knex = require(config.knex); // eslint-disable-line import/no-dynamic-require, global-require
  }

  table() {
    return this.knex(this.DEFAULT_NAME);
  }

  // CRUD ACCESS

  async addAccess(access) {
    return access ? this.knex(this.DEFAULT_NAME).insert(access).returning('*') : true;
  }

  async deleteAccess(access) {
    return access ? this.knex(this.DEFAULT_NAME).del().where(access) : true;
  }

  async findAccess(access) {
    return access ? this.knex(this.DEFAULT_NAME).select('*').where(access) : [];
  }

  async updateAccess(where, newValues) {
    return where ? this.knex(this.DEFAULT_NAME).update(newValues).where(where) : [];
  }

  async flushAccess() {
    return this.knex(this.DEFAULT_NAME).del();
  }
}


module.exports = DatabaseManager;
