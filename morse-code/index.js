'use strict';

module.exports = function (options, done) {

  var codes = options.codes;
  var message = options.message;
  var timeouter = options.timeouter;
  var toggle = options.toggle;

  var n = 0;

  var echoDot = function () {
    timeouter(toggle, n);
    timeouter(toggle, n + 1);
    n += 2;
  };

  var echoDash = function () {
    timeouter(toggle, n);
    timeouter(toggle, n + 3);
    n += 4;
  };

  var endWord = function () {
    n += 4;
  };

  var endLetter = function () {
    n += 2;
  };

  for (var i = 0, messageLen = message.length; i < messageLen; i += 1) {
    var m = message[i];

    var code = codes[m];
    if (code == null) {
      endWord();
      continue;
    }
    
    for (var j = 0, codeLen = code.length; j < codeLen; j += 1) {
      var c = code[j];

      switch (c) {
        case '-':
          echoDash();
          break;
        case '.':
          echoDot();
          break;
      }
    }

    endLetter();
  }

  timeouter(done, n);
};
