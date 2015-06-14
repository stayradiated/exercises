
function Middleware () {
  this._middleware = [];
}

Middleware.prototype.use = function (fn) {
  this._middleware.push(fn);
};

Middleware.prototype.go = function (done) {
  var i = -1;
  var len = this._middleware.length;

  var cb = function () {
    i += 1;

    if (i >= len) {
      done.call(this);
      return;
    }

    this._middleware[i].call(this, cb.bind(this))
  }

  cb.call(this);
};

module.exports = Middleware;
