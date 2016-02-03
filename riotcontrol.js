var riot = require('riot');
var RiotControl = {
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

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    this._subscribers.forEach(function(el){
      if (RiotControl._debug) {
        console.log(api + ' ->', args, el);
      }
      el[api].apply(el, args);
    });
  };
});

RiotControl.action = RiotControl.trigger;

if (typeof(module) !== 'undefined') module.exports = RiotControl;
