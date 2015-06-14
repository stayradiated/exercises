
module.exports = function (fn) {
  var cache = [];

  return function () {
    var args = Array.prototype.slice.call(arguments);

    itemLoop:
    for (var i = 0, len = cache.length; i < len; i += 1) {
      var item = cache[i];
      var argsLength = item.args.length;

      if (argsLength !== args.length) {
        continue itemLoop;
      }

      for (var j = 0; j < argsLength; j += 1) {
        if (item.args[j] !== args[j]) {
          continue itemLoop;
        }
      }

      return item.value;
    }

    var value = fn.apply(null, args);
    cache.push({
      args: args,
      value: value,
    });

    return value;
  };
};
