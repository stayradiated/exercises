
module.exports = function (max, fns) {
  return new Promise (function (resolve) {
    var results = [];
    var len = fns.length;
    var active = 0;
    var completed = 0
    var i = 0;

    var makeCallback = function (i) {
      return function (data) {
        results[i] = data;

        completed += 1;
        active -= 1;

        if (completed >= len) {
          resolve(results);
          return;
        }

        foreman();
      };
    };
  
    var foreman = function () {
      while (active < max) {
        active += 1;
        fns[i]().then(makeCallback(i));
        i += 1;
      }
    };

    foreman();
  });
};
