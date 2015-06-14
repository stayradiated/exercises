
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

    if (args == null) {
      args = Array.prototype.slice.call(arguments);
      ctx = this;
    }

    timeout = setTimeout(cb, delay);
  }
};
