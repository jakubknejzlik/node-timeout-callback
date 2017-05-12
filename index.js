"use strict";

module.exports = function(timeout, callback) {
  var called = false;
  if (typeof timeout === "function") {
    callback = timeout;
    timeout = 10 * 1000;
  }

  var interval = setTimeout(
    function() {
      if (called) return;
      called = true;
      callback(new Error("callback timeout"));
    },
    timeout
  );

  return function() {
    if (called) return;
    called = true;
    clearTimeout(interval);
    const args = Array.prototype.slice.call(arguments);
    args.unshift(null);
    callback.apply(this, args);
  };
};
