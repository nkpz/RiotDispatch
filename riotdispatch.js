if (typeof require !== 'undefined' && typeof riot === 'undefined') {
    var riot = require('riot');
}

var RiotDispatch = {
  _subscribers: [],
  _debug: false,
  subscriber: function() {
    var subscriber = riot.observable({});
    this.subscribe(subscriber);
    return subscriber;
  },
  subscribe: function(subscriber) {
    this._subscribers.push(subscriber);
  },
  reset: function() {
    this._subscribers = [];
  },
  debug: function(setting) {
    this._debug = Boolean(setting);
  }
};


RiotDispatch.action = function() {
  var args = [].slice.call(arguments);
  this._subscribers.forEach(function(el){
    if (RiotDispatch._debug) {
      console.log(args, el);
    }
    el.trigger.apply(el, args);
  });
};

if (typeof(module) !== 'undefined') module.exports = RiotDispatch;
