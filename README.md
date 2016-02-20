Usage:

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

//View the activity of the dispatcher in console
RiotDispatch.debug(true);

//Subscribe as a view. This component will receive global actions and view actions.
RiotDispatch.view.subscribe(self);

self.apiStuff = "";

self.getApiStuff = function() {
    //Create an action to be dispatched to APIs
    RiotDispatch.api.action('getApiStuff');
};

//Listens for an action which can be triggered with RiotDispatch.action (global action) or RiotDispatch.view.action (view action)
self.on('apiStuffChanged', function(apiStuff) {
    self.apiStuff = apiStuff;
    self.update();
});
```

**stuffApi.js**
```
//Subscribe as an API. This subscriber will receive global actions and API actions.
var self = RiotDispatch.api.subscriber();

//This is triggered by a button's onclick handler in the view.
self.on('getApiStuff', function() {
    $.get('http://api.test.xyz/')
    .done(function(apiStuff) {
        //Create an action to be dispatched to stores. This action contains the data received from the API
        RiotDispatch.store.action('apiStuffReceived', apiStuff);
    });
});

module.exports = self;
```

**stuffStore.js**
```
//Subscribe as an API. This subscriber will receive global actions and store actions.
var self = RiotDispatch.store.subscriber();

var apiStuffChanged = function() {
    //Create an action to be dispatched to views. This action contains the current contents of the store.
    RiotDispatch.view.action('apiStuffChanged', self.apiStuff);
};

self.apiStuff = "Default value from store";
apiStuffChanged();

//This is triggered by the API and contains data from an AJAX request which we'd like to store.
self.on('apiStuffReceived', function(apiStuff) {
    self.apiStuff = "Stuff from API in store"
    apiStuffChanged();
});

module.exports = self;
```
