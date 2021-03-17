const Codemaster = require('codemaster');

const ALL_VERBS = 'all';

class AccessList {

  get() {
    return this.list;
  }

  getRoles() {
    return Codemaster.utils.cloneJSON(this.roles || []);
  }

  flush() {
    this.list = undefined;
    this.roles = undefined;
  }


  init(input) {
    if (this.list) return;
    this.insertSlashIfNeeded(input);
    this.initSort(input);
    this.setAccessList(input);
  }

  insertSlashIfNeeded(input) {
    input = input || {};
    const roleKeys = Object.keys(input);
    for (let i = 0; i < roleKeys.length; i++) {
      const array = input[roleKeys[i]];
      for (let j = 0; j < array.length; j++) {
        if (Array.isArray(array[j])) {
          if (!array[j][0].startsWith('/')) array[j][0] = `/${array[j][0]}`;
        } else if (!array[j].startsWith('/')) array[j] = `/${array[j]}`;
      }
    }
  }

  initSort(input) {
    input = input || {};
    const roleKeys = Object.keys(input);
    for (let i = 0; i < roleKeys.length; i++) {
      input[roleKeys[i]].sort((a) => {
        const value = Array.isArray(a) ? a[0] : a;
        return value.includes('/:') ? 1 : -1;
      });
    }
  }

  setAccessList(input) {
    input = input || {};
    this.list = this.list || {};
    this.roles = Object.keys(input);
    for (let i = 0; i < this.roles.length; i++) {
      const role = this.roles[i];
      let array = input[role] || [];
      array = Array.isArray(array) ? array : [array];
      for (let j = 0; j < array.length; j++) {
        this.parseEntry(role, array[j]);
      }
    }
    return this.list;
  }

  // //////////FIND

  find(url, verb) {
    if (!this.list) return {};
    const results = {};
    for (let i = 0; i < this.roles.length; i++) {
      const inRole = this.findInRole(this.roles[i], url, verb);
      if (inRole) results[this.roles[i]] = inRole;
    }
    return results;
  }

  findInRole(role, url, verb) {
    if (!this.list || !this.list[role]) return null;
    const array = this.list[role] || [];
    for (let i = 0; i < array.length; i++) {
      const urlIsCorrect = this.urlMatches(array[i].path, url);
      const correctVerb = (verb === array[i].verb || array[i].verb === ALL_VERBS);
      if (urlIsCorrect && correctVerb) return array[i];
    }
    return null;
  }

  // /////////URL MATCHES

  buildRegex(input) {
    if (!input) return null;
    const parts = input.split('/');
    let comp = '^';
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) comp += '[^\\/]*/';
      else if (parts[i] === '*') comp += '.*/';
      else comp += `${parts[i]}/`;
    }
    comp += '$';
    return comp;
  }

  urlMatches(comparison, url) {
    const compare = this.buildRegex(comparison);
    if (!compare || !url) return false;
    const tester = new RegExp(compare);
    url = url.endsWith('/') ? url : `${url}/`;
    return tester.test(url);
  }

  // //////////PARSE ENTRY

  parseEntry(role, entry) {
    if (!this.list) this.list = {};
    if (!this.list[role]) this.list[role] = [];

    this.list[role].push({
      path: this.pathFromEntry(entry),
      verb: this.verbFromEntry(entry),
      filter: this.filterFromEntry(entry),
    });
  }

  filterFromEntry(entry) {
    const hasFilterSpecification = Array.isArray(entry) && entry.length > 1 && entry[1];
    if (!hasFilterSpecification) return undefined;
    return entry[1].toLowerCase();
  }

  pathFromEntry(entry) {
    const p = Array.isArray(entry) ? entry[0] : entry;
    return p ? p.toLowerCase() : p;
  }

  verbFromEntry(entry) {
    const hasVerbSpecification = Array.isArray(entry) && entry.length > 2 && entry[2];
    if (!hasVerbSpecification) return ALL_VERBS;
    return entry[2].toLowerCase();
  }

}


module.exports = AccessList;
