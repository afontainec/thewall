let access;
let roles;
const config = require('./config');

const getAccessList = () => {
  return access;
};

const flushAccessList = () => {
  access = undefined;
};


const init = () => {
  if (access) return;
  setAccess(config);
};

const setAccess = (input) => {
  input = input || {};
  access = access || {};
  roles = Object.keys(input);
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const array = input[role] || [];
    for (let j = 0; j < array.length; j++) {
      parseEntry(role, array[j]);
    }
  }
  return access;
};

// GET ROLE

const extractRoles = (url) => {
  const presentIn = [];
  for (let i = 0; i < roles.length; i++) {
    if (roleHasURL(roles[i], url)) presentIn.push(roles[i]);
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

const roleHasURL = (role, url) => {
  const array = access[role];
  for (let i = 0; i < array.length; i++) {
    if (urlMatches(array[i].path, url)) return true;
  }
  return false;
};

const urlMatches = (comparison, url) => {
  const compare = buildRegex(comparison);
};


// //////////PARSE ENTRY

const parseEntry = (role, entry) => {
  if (!access) access = {};
  if (!access[role]) access[role] = [];
  access[role].push({
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
    pathFromEntry,
    filterFromEntry,
    flushAccessList,
    verbFromEntry,
    parseEntry,
    init,
    getAccessList,
    setAccess,
    access,
  };
} else {
  init();
}
