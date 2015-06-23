'use strict';

module.exports = function (fn, delay) {
  var timeout = null;
  var args = null;
  var ctx = null;

  var cb = function () {
    fn.apply(ctx, args);
    ctx = null;
    args = null;
  };

  return function () {
    if (timeout != null) {
      clearTimeout(timeout);
    }

    args = arguments;
    ctx = this;

    timeout = setTimeout(cb, delay);
  };

};
