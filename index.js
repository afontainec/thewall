const TheWall = require('./thewall');

// //// Has Access

module.exports = function initialize(config) {
  return new TheWall(config);
};
