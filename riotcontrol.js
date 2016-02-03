var riot = require('riot');
var RiotControl = {
  _subscribers: [],
  _debug: false,
  newStore: function() {
    var store = riot.observable({});
    this.subscribe(store);
    return store;
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
        console.log(api + ' ->', el, args);
      }
      el[api].apply(el, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;
