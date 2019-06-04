const hasAccess = (userId, url, entries) => {
  if (isEmpty(entries)) return true; // if its not restricted then its open to everyone
  const validCombinations = parseEntries(url, entries);
  // return DatabaseManager.hasAccess(userId, validCombinations);
};

function isEmpty(json) {
  return Object.keys(json) === 0;
}

const parseEntries = (url, entries) => {
  const roles = Object.keys(entries);
  const array = [];
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    array.push(buildCombination(url, role, entries[role]));
  }
  return array;
};

const buildCombination = (url, role, entry) => {
  if (!role || !entry) return [];
  const combination = [role];
  if (!entry.filter) return combination;
  combination.push(extractFilter(url, entry.path, entry.filter));
  console.log('--------------------------------');
  console.log(entry);
  console.log(combination);
  console.log('--------------------------------');
  return combination;
};

const extractFilter = (url, templateUrl, filter) => {
  const divider = `:${filter}`;
  const parts = templateUrl.split(divider);
  const extractor = `^${parts[0]}(.*)${parts[1]}$`;
  const regex = new RegExp(extractor);
  return url.match(regex);
};


const publicMethods = {
  canItGoThrough: hasAccess,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.extractFilter = extractFilter;
}

module.exports = publicMethods;
