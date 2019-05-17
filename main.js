let list;
let roles;
const config = require('./config');

const getAccessList = () => {
  return list;
};

const flushAccessList = () => {
  list = undefined;
};


const init = () => {
  if (list) return;
  setAccessList(config);
};

const setAccessList = (input) => {
  input = input || {};
  list = list || {};
  roles = Object.keys(input);
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const array = input[role] || [];
    for (let j = 0; j < array.length; j++) {
      parseEntry(role, array[j]);
    }
  }
  return list;
};


// //// Has Access


const hasAccess = (userId, url, verb) => {

};

// GET ROLE

const extractRoles = (url, verb) => {
  const presentIn = [];
  for (let i = 0; i < roles.length; i++) {
    if (roleHasURL(roles[i], url, verb)) presentIn.push(roles[i]);
  }
  return presentIn;
};

const buildRegex = (input) => {
  if (!input) return null;
  const parts = input.split('/');
  let comp = '^';
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith(':')) comp += '.*/';
    else if (parts[i] === '*') comp += '.*/';
    else comp += `${parts[i]}/`;
  }
  comp += '$';
  return comp;
};

const roleHasURL = (role, url, verb) => {
  const array = list[role] || [];
  for (let i = 0; i < array.length; i++) {
    if (urlMatches(array[i].path, url) && verb === array[i].verb) return true;
  }
  return false;
};

const urlMatches = (comparison, url) => {
  const compare = buildRegex(comparison);
  if (!compare) return false;
  const tester = new RegExp(compare);
  url = url.endsWith('/') ? url : `${url}/`;
  return tester.test(url);
};


// //////////PARSE ENTRY

const parseEntry = (role, entry) => {
  if (!list) list = {};
  if (!list[role]) list[role] = [];
  list[role].push({
    path: pathFromEntry(entry),
    verb: verbFromEntry(entry),
    filter: filterFromEntry(entry),
  });
};

const filterFromEntry = (entry) => {
  const hasFilterSpecification = Array.isArray(entry) && entry.length > 1 && entry[1];
  if (!hasFilterSpecification) return undefined;
  return entry[1];
};

const pathFromEntry = (entry) => {
  return Array.isArray(entry) ? entry[0] : entry;
};

const verbFromEntry = (entry) => {
  const hasVerbSpecification = Array.isArray(entry) && entry.length > 2 && entry[2];
  if (!hasVerbSpecification) return 'get';
  return entry[2];
};


if (process.env.NODE_ENV === 'test') {
  module.exports = {
    buildRegex,
    extractRoles,
    init,
    filterFromEntry,
    flushAccessList,
    getAccessList,
    pathFromEntry,
    parseEntry,
    roleHasURL,
    urlMatches,
    setAccessList,
    verbFromEntry,

  };
} else {
  init();
}
