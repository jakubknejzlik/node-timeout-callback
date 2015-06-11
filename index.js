'use string';

module.exports = function(timeout,callback){
    var called = false;
    if(typeof timeout === 'function'){
        callback = timeout;
        timeout = 30*1000;
    }

    var interval = setTimeout(function(){
        if(called)return;
        called = true;
        callback(new Error('callback timeout'));
    },timeout);

    return function(){
        if(called)return;
        called = true;
        clearTimeout(interval);
        callback.apply(this,arguments);
    }
}