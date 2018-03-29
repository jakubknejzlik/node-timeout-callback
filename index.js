"use strict";

const defaultOptions = {
    isolateFirstArgForTimeoutError: true,
};

module.exports = function(timeout, callback, options) {
  let called = false;

  // Check to see if it's actually an options object.
  if (typeof callback === "object"
    && callback.hasOwnProperty("isolateFirstArgForTimeoutError")
  ) {
    options = callback;
  }

  if (typeof timeout === "function") {
    callback = timeout;
    timeout = 10 * 1000;
  }

  options = { ...defaultOptions, ...options };

  let interval = setTimeout(
    function() {
      if (called) return;
      called = true;
      callback(new Error("callback timeout"));
    },
    timeout
  );

  return function(...args) {
    if (called) return;
    called = true;
    clearTimeout(interval);

    if (options.isolateFirstArgForTimeoutError) {
      args.unshift(null);
    }

    callback(...args);
  };
};
