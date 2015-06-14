
exports.sequence = function(fns) {
  return function (done) {
    var i = -1;
    var len = fns.length;
    var returned = false;

    var cb = function (err, data) {
      if (returned) {
        return;
      }

      // function returned an error
      if (err != null) {
        done(err, null);
        returned = true;
        return;
      }

      // reached end of queue
      i += 1;
      if (i >= len) {
        done(null, data);
        returned = true;
        return;
      }

      try {
        fns[i](cb, data);
      } catch (err) {
        // function threw an error
        done(err, null);
        returned = true;
        return;
      }
    };

    cb(null, null)
  };
}

exports.parallel = function(fns) {
  return function(done) {
    var len = fns.length;
    var completed = 0;
    var returned = false;
    var results = [];

    fns.forEach(function (fn, i) {
      if (returned) { 
        return;
      }

      try {
        fn(function(err, data) {

          // function returned an error
          if (err != null) {
            done(err, null);
            returned = true;
            return
          }

          results[i] = data;
          completed += 1;

          // reached end of queue
          if (completed >= len) {
            done(null, results)
            returned = true;
            return;
          }
        });
      } catch (err) {
        // function threw an error
        done(err, null);
        returned = true;
        return;
      }
    });
  };
}

exports.race = function(fns) {
  return function(done) {
    var returned = false;

    fns.forEach(function (fn) {
      if (returned) {
        return;
      }

      try {
        fn(function(err, data) {
          if (returned) {
            return;
          }

          // function returned an error
          if (err != null) {
            done(err, null);
            returned = true;
            return;
          }

          done(null, data)
          returned = true;
        });
      } catch (err) {
        // function threw an error
        done(err, null);
        returned = true;
        return;
      }
    });
  };
}
