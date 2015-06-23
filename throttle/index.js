'use strict';

module.exports = function (fn, delay) {
  var canRun = true;
  var runOnEnd = false;

  var args = null;
  var ctx = null;

  var cb = function () {
    if (canRun === false) {
      runOnEnd = true;
      ctx = this;
      args = arguments;
      return;
    }

    fn.apply(this, arguments);
    canRun = false;

    setTimeout(function () {
      canRun = true;
      if (runOnEnd === true) {
        runOnEnd = false;
        cb.apply(ctx, args);
      }
    }, delay);
  };

  return cb;
};
