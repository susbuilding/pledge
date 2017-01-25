'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:


function $Promise(executor){
 this._state = 'pending';
 this._handlerGroups = [];

 if(typeof executor !== 'function'){
  throw new Error('error');
 }
  //  var resolve = function(data){
  //    return this._internalResolve(data);
  //  };
  //  var reject = function(data){
  //    return this._internalReject(data);
  //  };

   //internal methods
   this._internalResolve = this._internalResolve.bind(this);
   this._internalReject = this._internalReject.bind(this);
   this._callHandlers = this._callHandlers.bind(this);

   executor(this._internalResolve, this._internalReject)
}

$Promise.prototype._internalResolve = function(data){
  if(this._state === 'pending') {
    this._state = 'fulfilled';
    this._value = data;
  }
  this._callHandlers();
};

$Promise.prototype._internalReject = function(data){
  if(this._state === 'pending'){
    this._state = 'rejected';
    this._value = data;
  }
  this._callHandlers();
};


$Promise.prototype.then = function(data, err){

  var data = typeof data !== 'function' ? false : data;
  var err = typeof err !== 'function' ? false : err;

  var obj = {
    successCb: data,
    errorCb: err
  }
  this._handlerGroups.push(obj);

  if(this._state === 'fulfilled') {
    this._callHandlers();
  }


};

$Promise.prototype._callHandlers = function(){

var handler;

  while(this._handlerGroups.length) {
    handler = this._handlerGroups.shift();

      if(this._state === 'fulfilled') {
       handler.successCb(this._value);
      }

      if(this._state === 'rejected') {
        handler.rejectCb(this._value);
      }
  }

};








/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
