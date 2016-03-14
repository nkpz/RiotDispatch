if (typeof require !== 'undefined' && typeof riot === 'undefined') {
    var riot = require('riot');
}

var hasConsoleTrace = typeof console.trace !== "undefined";

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
    },
    action: function() {
        var args = [].slice.call(arguments);
        RiotDispatch._debug && hasConsoleTrace && console.trace("global action created: " + args[0]);
        RiotDispatch._debug && console.log(args[0], args.slice().splice(1), '-> ', this._subscribers);
        this._subscribers.forEach(function(el) {
            el.trigger.apply(el, args);
        }, this);
    },
};

['view', 'store', 'api'].forEach(function(nodeType) {
    RiotDispatch[nodeType] = {
        _subscribers: [],
        subscribe: function(subscriber) {
            RiotDispatch.subscribe(subscriber);
            this._subscribers.push(subscriber);
        },
        subscriber: function() {
            var subscriber = riot.observable({});
            this.subscribe(subscriber);
            return subscriber;
        },
        action: function() {
            var args = [].slice.call(arguments);
            RiotDispatch._debug && hasConsoleTrace && console.trace(nodeType + " action created: " + args[0]);
            RiotDispatch._debug && console.log(args[0], args.slice().splice(1), '-> ', this._subscribers);
            this._subscribers.forEach(function(el) {
                el.trigger.apply(el, args);
            }, this);
        }
    }
});

if (typeof(module) !== 'undefined') module.exports = RiotDispatch;
