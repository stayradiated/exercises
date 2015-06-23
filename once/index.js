'use strict';

module.exports = function (fn) {
  var called = false;
  var value = null;
  return function () {
    if (called) {
      return value;
    }

    value = fn.apply(this, arguments);
    called = true;

    return value;
  };
};
