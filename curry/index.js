'use strict';

module.exports = function (fn) {
  return function() {
    var len = fn.length;

    var cb = function (lastArgs) {
      return function () {
        var args = lastArgs.concat(Array.prototype.slice.call(arguments));
        if (args.length >= len) {
          return fn.apply(this, args);
        } else {
          return cb(args);
        }
      };
    };

    return cb([]).apply(this, arguments);
  };
};
