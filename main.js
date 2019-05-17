let access;
const config = require('./config');
//
// const extractRoles = (url) => {
//
// };

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
  const roles = Object.keys(input);
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const array = input[role] || [];
    for (let j = 0; j < array.length; j++) {
      parseEntry(role, array[j]);
    }
  }
  return access;
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
