
module.exports = function (thunk) {
  return function (done) {
    var cb = function (err, next) {
      if (err != null) {
        done(err, null)
        return
      }

      if (typeof next === "function") {
        next(cb)
        return
      }

      done(null, next);
    };

    thunk(cb);
  }
};
