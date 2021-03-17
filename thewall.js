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
    this.findAccess = this.databaseManager.findAccess;
    this.updateAccess = this.databaseManager.updateAccess;
    this.deleteAccess = this.databaseManager.deleteAccess;
    this.getRoles = this.accessList.getRoles;
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
    return this.databaseManager.addAccess(access);
  }
}


module.exports = TheWall;
