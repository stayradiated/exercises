'use strict';

function Beeper(timeouter, toggle) {
  this.n = 0;
  this.timeouter = timeouter;
  this.toggle = toggle;
}

Beeper.prototype.dot = function () {
  this.call(this.toggle);
  this.n += 1;
  this.call(this.toggle);
  this.n += 1;
};

Beeper.prototype.dash = function () {
  this.call(this.toggle);
  this.n += 3;
  this.call(this.toggle);
  this.n += 1;
};

Beeper.prototype.word = function () {
  this.n += 4;
};

Beeper.prototype.letter = function () {
  this.n += 2;
};

Beeper.prototype.call = function (fn) {
  this.timeouter(fn, this.n);
};


module.exports = function (options, done) {
  var codes = options.codes;
  var message = options.message;
  var beeper = new Beeper(options.timeouter, options.toggle);

  for (var i = 0, messageLen = message.length; i < messageLen; i += 1) {
    var m = message[i];

    var code = codes[m];
    if (code == null) {
      beeper.word();
      continue;
    }
    
    for (var j = 0, codeLen = code.length; j < codeLen; j += 1) {
      var c = code[j];

      switch (c) {
        case '-':
          beeper.dash();
          break;
        case '.':
          beeper.dot();
          break;
      }
    }

    if (i < messageLen - 1) {
      beeper.letter();
    }
  }

  beeper.call(done);
};
