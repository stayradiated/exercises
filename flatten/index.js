'use strict';

function flatten (list) {
  var out = [];

  list.forEach(function (value) {
    if (Array.isArray(value)) {
      value = flatten(value);
      out = out.concat(value);
    } else {
      out.push(value);
    }
  });

  return out;
}

module.exports = flatten;
