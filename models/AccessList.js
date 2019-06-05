let list;
let roles;

const get = () => {
  return list;
};

const flush = () => {
  list = undefined;
};


const init = (input) => {
  if (list) return;
  setAccessList(input);
};

const setAccessList = (input) => {
  input = input || {};
  list = list || {};
  roles = Object.keys(input);
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    let array = input[role] || [];
    array = Array.isArray(array) ? array : [array];
    for (let j = 0; j < array.length; j++) {
      parseEntry(role, array[j]);
    }
  }
  return list;
};

// //////////FIND

const findInRole = (role, url, verb) => {
  if (!list || !list[role]) return null;
  const array = list[role] || [];
  for (let i = 0; i < array.length; i++) {
    const urlIsCorrect = urlMatches(array[i].path, url);
    if (urlIsCorrect && verb === array[i].verb) return array[i];
  }
  return null;
};

const find = (url, verb) => {
  if (!list) return {};
  const results = {};
  for (let i = 0; i < roles.length; i++) {
    const inRole = findInRole(roles[i], url, verb);
    if (inRole) results[roles[i]] = inRole;
  }
  return results;
};

// /////////URL MATCHES

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

const urlMatches = (comparison, url) => {
  const compare = buildRegex(comparison);
  if (!compare || !url) return false;
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
  return entry[1].toLowerCase();
};

const pathFromEntry = (entry) => {
  const p = Array.isArray(entry) ? entry[0] : entry;
  return p ? p.toLowerCase() : p;
};

const verbFromEntry = (entry) => {
  const hasVerbSpecification = Array.isArray(entry) && entry.length > 2 && entry[2];
  if (!hasVerbSpecification) return 'get';
  return entry[2].toLowerCase();
};

const publicMethods = {
  init,
  find,
  flush,
  get,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.buildRegex = buildRegex;
  publicMethods.filterFromEntry = filterFromEntry;
  publicMethods.findInRole = findInRole;
  publicMethods.pathFromEntry = pathFromEntry;
  publicMethods.parseEntry = parseEntry;
  publicMethods.setAccessList = setAccessList;
  publicMethods.urlMatches = urlMatches;
  publicMethods.verbFromEntry = verbFromEntry;
}


module.exports = publicMethods;
