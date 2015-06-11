var assert = require('assert');

var timeoutCallback = require('../index.js');

describe('test callback timeout',function(){
    it('should call callback function regularly',function(done){
        var c = function(err,arg1,arg2){
            assert.equal(arg1,'aaa');
            assert.equal(arg2,'bbb');
            done(err)
        }
        var tc = timeoutCallback(c);
        tc(null,'aaa','bbb');
    });
    it('should call callback function with delay',function(done){
        var c = function(err,arg1,arg2){
            assert.equal(arg1,'aaa');
            assert.equal(arg2,'bbb');
            done(err)
        }
        var tc = timeoutCallback(c);
        setTimeout(function(){
            tc(null,'aaa','bbb');
        },200);
    });

    it('should timeout callback',function(done){
        var c = function(err,arg1,arg2){
            assert.ok(err != null)
            assert.ok(arg1 == null);
            assert.ok(arg2 == null);
            done()
        }
        var tc = timeoutCallback(500,c);
        setTimeout(function(){
            tc(null,'aaa','bbb');
        },2000);
    });
})

