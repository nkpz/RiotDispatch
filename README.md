RiotDispatch
=
*A fork of RiotControl: https://github.com/jimsparkman/RiotControl*

*Tiny dispatcher for using the Flux architectural pattern with Riot.js*

**Riot Tag:**
```
<hello>
    <button onclick={ getApiStuff }>
        Get some stuff from our stuff api
    </button>

    <div class="api-stuff">
        { apiStuff }
    </div>
</hello>

var self = this;
RiotDispatch.view.subscribe(self);

self.apiStuff = "";

self.getApiStuff = function() {
    RiotDispatch.api.action('getApiStuff');
};

self.on('apiStuffChanged', function(apiStuff) {
    self.apiStuff = apiStuff;
    self.update();
};
```

**stuffApi.js**
```
var self = RiotDispatch.api.subscriber();

self.on('getApiStuff', function() {
    $.get('http://api.test.xyz/')
    .done(function(apiStuff) {
        RiotDispatch.store.action('apiStuffReceived', apiStuff);
    });
});

module.exports = self;
```

**stuffStore.js**
```
var self = RiotDispatch.store.subscriber();

var apiStuffChanged = function() {
    RiotDispatch.view.action('apiStuffChanged', self.apiStuff);
};

self.apiStuff = "Default value from store";
apiStuffChanged();

self.on('apiStuffReceived', function(apiStuff) {
    self.apiStuff = "Stuff from API in store"
    apiStuffChanged();
});

module.exports = self;
```
