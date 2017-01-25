'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:


function $Promise(executor){
 this._state = 'pending';
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


$Promise.prototype.then = function(data, err){

  var data = typeof data !== 'function' ? false : data;
  var err = typeof err !== 'function' ? false : err;

  var obj = {
    successCb: data,
    errorCb: err
  }
  this._handlerGroups.push(obj);

  if(this._state === 'fulfilled') {
    this._callHandler(this._handlerGroups[this._handlerGroups.length -1]);
  }
  else {
    
  }

};

$Promise.prototype._callHandler = function(obj){

  // console.log(this._handlerGroups[this._handlerGroups.length -1].successCb(this._value));


  obj.successCb(this._value);

};



  // if (this._state === 'fulfilled' && typeof data === 'function'){
  //   this._handlerGroups.map(function(executor){
  //     return data(this._value);
  //   })
  // }








/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
