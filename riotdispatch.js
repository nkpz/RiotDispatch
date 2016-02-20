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
        hasConsoleTrace && console.trace("global action created");
        this._subscribers.forEach(function(el) {
            if (this._debug) {
                console.log(args, '-> global ->', el);
            }
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
            var subscriber = RiotDispatch.subscriber();
            this.subscribe(subscriber);
            return subscriber;
        },
        action: function() {
            var args = [].slice.call(arguments);
            hasConsoleTrace && console.trace(nodeType + " action created");
            this._subscribers.forEach(function(el) {
                if (RiotDispatch._debug) {
                    console.log(args, '-> ' + nodeType + ' ->', el);
                }
                el.trigger.apply(el, args);
            }, this);
        }
    }
});

if (typeof(module) !== 'undefined') module.exports = RiotDispatch;
