'use strict';

function value (x) {
  if (typeof(x) === 'function') {
    return value(x());
  }
  return x;
}

module.exports = value;
