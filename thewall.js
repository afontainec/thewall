const AccessList = require('./models/AccessList');
const Guard = require('./models/guard');
const DatabaseManager = require('./models/DatabaseManager');

class TheWall {

  constructor(config) {
    this.databaseManager = new DatabaseManager(config);
    this.accessList = new AccessList(config.access);
    this.guard = new Guard(this.databaseManager);
    this.initialize(config);
  }

  initialize() {
    this.getRoles = this.accessList.getRoles;
  }

  findAccess(...params) {
    return this.databaseManager.findAccess(...params);
  }

  updateAccess(...params) {
    return this.databaseManager.updateAccess(...params);
  }

  deleteAccess(...params) {
    return this.databaseManager.deleteAccess(...params);
  }


  async hasAccess(userId, url, verb) {
    if (url) url = url.toLowerCase();
    if (verb) verb = verb.toLowerCase();
    const entries = this.accessList.find(url, verb);
    return this.guard.canItGoThrough(userId, url, entries);
  }

  async addAccess(userId, role, filter) {
    if (!userId || !role) throw new Error('No user_id and/or role defined');
    const access = {
      user_id: userId,
      role,
    };
    if (filter) access.filter = filter;
    const [result] = await this.databaseManager.addAccess(access);
    return result;
  }
}


module.exports = TheWall;
