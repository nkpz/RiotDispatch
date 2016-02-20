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
RiotControl.subscribe(self);
self.apiStuff = "";

self.getApiStuff = function() {
    RiotControl.action('getApiStuff');
};

self.on('apiStuffChanged', function(apiStuff) {
    self.apiStuff = apiStuff;
};
```

**stuffApi.js**
```
var stuffApi = RiotControl.subscriber();

stuffApi.on('getApiStuff', function() {
    $.get('http://api.test.xyz/')
    .done(function(apiStuff) {
        RiotControl.action('apiStuffReceived', apiStuff);
    });
});

module.exports = stuffApi;
```

**stuffStore.js**
```
var self = RiotControl.subscriber();

var apiStuffChanged = function() {
    RiotControl.action('apiStuffChanged', self.apiStuff);
}

self.apiStuff = "Default value from store";
apiStuffChanged();

self.on('apiStuffReceived', function(apiStuff) {
    self.apiStuff = "Stuff from API in store"
    apiStuffChanged();
});

module.exports = self;
```
