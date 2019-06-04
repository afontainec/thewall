const hasAccess = (userId, url, entries) => {
  if (isEmpty(entries)) return true; // if its not restricted then its open to everyone
  const validCombinations = getCombinations(url, entries);
  // return DatabaseManager.hasAccess(userId, validCombinations);
};

function isEmpty(json) {
  return !json || Object.keys(json) === 0;
}

const getCombinations = (url, entries) => {
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
  const filterValue = extractFilter(url, entry.path, entry.filter);
  combination.push(filterValue);
  return combination;
};

const extractFilter = (url, templateUrl, filter) => {
  if (!url || !templateUrl) return null;
  const divider = `:${filter}`;
  const parts = templateUrl.split(divider);
  if (parts.length !== 2) return null;
  const extractor = `^${parts[0]}(.*)${parts[1]}$`;
  const regex = new RegExp(extractor);
  const result = url.match(regex);
  return result && result[1] ? result[1] : null;
};


const publicMethods = {
  canItGoThrough: hasAccess,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.buildCombination = buildCombination;
  publicMethods.extractFilter = extractFilter;
}

module.exports = publicMethods;
