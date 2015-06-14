
module.exports = function (fn) {

  var config = fn();

  it(config.desc, function () {
    var flag = false;
    runs(function () {
      config.setup(function () {
        flag = true;
      });
    });
    waitsFor(function () {
      return flag;
    });
    runs(config.test);
  });

};
