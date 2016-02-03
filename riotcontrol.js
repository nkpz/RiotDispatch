var RiotControl = {
  _stores: [],
  _debug: false,
  addStore: function(store) {
    this._stores.push(store);
  },
  reset: function() {
    this._stores = [];
  },
  debug: function(setting) {
    this._debug = Boolean(setting);
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    this._stores.forEach(function(el){
      if (RiotControl._debug) {
        console.log(api + ' ->', el, args);
      }
      el[api].apply(el, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;
