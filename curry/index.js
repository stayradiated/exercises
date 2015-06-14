
module.exports = function (fn) {
  return function() {
    var len = fn.length;
    var finalArgs = [];

    var cb = function () {
      var args = Array.prototype.slice.call(arguments);
      finalArgs = finalArgs.concat(args);

      if (finalArgs.length >= len) {
        return fn.apply(null, finalArgs);
      } else {
        return cb;
      }
    }

    return cb.apply(null, arguments);
  };
}
