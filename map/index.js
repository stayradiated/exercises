'use strict';

module.exports = function (list, fn, ctx) {
  var out = [];
  for (var i = 0, len = list.length; i < len; i += 1) {
    out[i] = fn.call(ctx, list[i], i, list);
  }
  return out;
};
