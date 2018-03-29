var assert = require("assert");

var timeoutCallback = require("../index.js");

describe("test callback timeout", function() {
  it("should call callback function regularly", function(done) {
    var c = function(err, arg1, arg2) {
      assert.equal(arg1, "aaa");
      assert.equal(arg2, "bbb");
      done(err);
    };
    var tc = timeoutCallback(c);
    tc("aaa", "bbb");
  });

  it("should call callback function with delay", function(done) {
    var c = function(err, arg1, arg2) {
      assert.equal(arg1, "aaa");
      assert.equal(arg2, "bbb");
      done(err);
    };
    var tc = timeoutCallback(c);
    setTimeout(
      function() {
        tc("aaa", "bbb");
      },
      200
    );
  });

  it("should timeout callback", function(done) {
    var c = function(err, arg1, arg2) {
      assert.ok(err != null);
      assert.ok(arg1 == null);
      assert.ok(arg2 == null);
      done();
    };
    var tc = timeoutCallback(500, c);
    setTimeout(
      function() {
        tc("aaa", "bbb");
      },
      2000
    );
  });

  it("should execute callback immediately", function() {
    var c = function(err, arg1, arg2) {
      assert.ok(err == null);
      assert.equal(arg1, "aaa");
      assert.equal(arg2, "bbb");
    };
    var tc = timeoutCallback(500, c);
    tc("aaa", "bbb");
  });

  describe("option obedience", function() {
    describe("'isolateFirstArgForTimeoutError' option", function() {
      it("without a timeout error", function(done) {
        var c = function (arg1, arg2) {
          assert.equal(arg1, "aaa");
          assert.equal(arg2, "bbb");
          done();
        };

        var tc = timeoutCallback(c, {
          isolateFirstArgForTimeoutError: false,
        });
        tc("aaa", "bbb");
      });

      it("with a timeout error", function(done) {
        var c = function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message, "callback timeout");
          done();
        };

        var tc = timeoutCallback(100, c, {
          isolateFirstArgForTimeoutError: false,
        });
      });
    });
  });
});
