When working with socket.io emitted message with callback, if the socket disconnect before answering (or doesn't answer at all) the callback function hangs up forever. In these situations you need to timeout this callback.

This wrapper makes this task easy. Just do:

	var timeoutCallback = require('timeout-callback');
	
	socket.emit('message-expecting-answer',timeoutCallback(function(err,arg1,arg2){
		console.log('this log is always displayed!');
	}));
	
	
	
By default timeout is set to 10 seconds, you can change this interval by specifying timeout as first argument (in milliseconds)

	timeoutCallback(60*1000,myCallbackFunction);

If the timeout is reached, the callback is called with error ```new Error('callback timeout')``` as the first argument.
