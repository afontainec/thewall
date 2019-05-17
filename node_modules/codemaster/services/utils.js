// server/services/utils.js
const Date = require('./utils/date');
const ArrayCM = require('./utils/array');

function isJson(x) {
  // check if its null
  if (!x || Array.isArray(x)) return false;
  return (typeof x) === 'object';
}

exports.isJSON = isJson;

exports.isEmptyJSON = function (x) {
  // if it is not a json then it is not an empty json
  if (!isJson(x)) {
    return false;
  }
  return Object.keys(x).length === 0;
};

exports.cloneObject = function (obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  let copy;
  try {
    copy = obj.constructor();
  } catch (err) {
    copy = {};
  }
  //eslint-disable-next-line
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr];
    }
  }
  return copy;
};

exports.concatUnique = function (a, b) {
  let d = a.concat(b);
  const set = new Set(d);
  d = Array.from(set);
  return d;
};

exports.cloneJSON = function (json) {
  return JSON.parse(JSON.stringify(json));
};

function randomInteger(min, max) {
  return min + Math.floor(Math.random() * ((max + 1) - min));
}


exports.randomInteger = randomInteger;

exports.randomEntry = function (array) {
  const randomIndex = randomInteger(0, array.length - 1);
  return array[randomIndex];
};

exports.promisesAll = function (array, func) {
  const promises = [];
  for (let i = 0; i < array.length; i++) {
    promises.push(func(array[i]));
  }
  return Promise.all(promises);
};

exports.wait = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

exports.isNullorUndefined = function (elem) {
  return elem === undefined || elem === null;
};

exports.queryToHttpString = function (query) {
  let str = '?';
  const keys = Object.keys(query);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const value = query[k];
    str += `${k}=${value}&`;
  }
  str = str.slice(0, -1); // remove last one
  return str;
};

exports.Date = Date;
exports.Array = ArrayCM;
