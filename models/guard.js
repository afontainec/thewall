const DatabaseManager = require('./DatabaseManager');

const hasAccess = async (userId, url, entries) => {
  const validCombinations = getCombinations(url, entries);
  // if its not restricted then its open to everyone
  if (validCombinations.length === 0) return true;
  const query = buildQuery(userId, validCombinations);
  const a = await query;
  return a.length > 0;
};

function buildQuery(userId, validCombinations) {
  validCombinations = validCombinations || [];
  const query = DatabaseManager.table();
  query.select('*');
  for (let i = 0; i < validCombinations.length; i++) {
    const array = validCombinations[i];
    if (array.length === 2) {
      query.orWhere(function filter() {
        this.where('role', array[0]).andWhere('filter', array[1]).andWhere('user_id', userId);
      });
    } else if (array.length === 1) {
      query.orWhere(function filter() {
        this.where('role', array[0]).andWhere('user_id', userId);
      });
    } else {
      query.orWhereRaw('1 = 0');
    }
  }
  return query;
}


// ////////////////////GET COMBINATIONS

const getCombinations = (url, entries) => {
  if (isEmpty(entries)) return [];
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
  let extractor = `^${parts[0]}(.*)${parts[1]}$`;
  const replaceParam = new RegExp('\\/:[^\\/]*', 'g');
  const replaceAsterisk = new RegExp('\\/\\*', 'g');
  extractor = extractor.replace(replaceParam, '\\/[^\\/]*');
  extractor = extractor.replace(replaceAsterisk, '\\/.*');
  const regex = new RegExp(extractor);
  const result = url.match(regex);
  return result && result[1] ? result[1] : null;
};

function isEmpty(json) {
  return !json || Object.keys(json) === 0;
}


const publicMethods = {
  canItGoThrough: hasAccess,
};

if (process.env.NODE_ENV === 'test') {
  publicMethods.buildCombination = buildCombination;
  publicMethods.buildQuery = buildQuery;
  publicMethods.extractFilter = extractFilter;
  publicMethods.getCombinations = getCombinations;
}

module.exports = publicMethods;
