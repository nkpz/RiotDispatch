RiotDispatch
=
*A fork of RiotControl: https://github.com/jimsparkman/RiotControl*

*Tiny dispatcher for using the Flux architectural pattern with Riot.js*

**Riot Tag:**
```
<hello>
    <button onclick={ getApiStuff }>
        Hey.
    </button>

    <div class="api-stuff">
        { apiStuff }
    </div>
</hello>

var self = this;
RiotDispatch.subscribe(self);

self.apiStuff = "";

self.getApiStuff = function() {
    RiotDispatch.action('getApiStuff');
};

self.on('apiStuffChanged', function(apiStuff) {
    self.apiStuff = apiStuff;
    self.update();
};
```

**stuffApi.js**
```
var self = RiotDispatch.subscriber();

self.on('getApiStuff', function() {
    $.get('http://api.test.xyz/')
    .done(function(apiStuff) {
        RiotDispatch.action('apiStuffReceived', apiStuff);
    });
});

module.exports = self;
```

**stuffStore.js**
```
var self = RiotDispatch.subscriber();

var apiStuffChanged = function() {
    RiotDispatch.action('apiStuffChanged', self.apiStuff);
}

self.apiStuff = "Default value from store";
apiStuffChanged();

self.on('apiStuffReceived', function(apiStuff) {
    self.apiStuff = "Stuff from API in store"
    apiStuffChanged();
});

module.exports = self;
```
