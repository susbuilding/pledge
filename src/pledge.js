'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:


function $Promise(executor){
 this._state = 'pending';
 this.executor = executor;
 this._handlerGroups = [];

 //console.log('#######', this._handlerGroups);
 if(typeof executor !== 'function'){
  throw new Error('error');
 }
   var resolve = function(data){
     return this._internalResolve(data);
   };
   var reject = function(data){
     return this._internalReject(data);
   };
   executor(resolve.bind(this), reject.bind(this))
}

$Promise.prototype._internalResolve = function(data){
  if(this._state === 'pending') {
    this._state = 'fulfilled';
    this._value = data;
  }
};

$Promise.prototype._internalReject = function(data){
  if(this._state === 'pending'){
    this._state = 'rejected';
    this._value = data;
  }
};

$Promise.prototype._callHandlers = function(arg){
}

$Promise.prototype.then = function(data, err){

  var data = typeof data !== 'function' ? false : data;
  var err = typeof err !== 'function' ? false : err;

  this._handlerGroups.push(this.executor);
  this._handlerGroups[0].successCb = data;
  this._handlerGroups[0].errorCb = err;

   console.log('THIS IS DATA', data);
   console.log('ERROR', err);

  if (this._state === 'fulfilled' && typeof data === 'function'){
    console.log('here')
    return data();
  }

}




/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
