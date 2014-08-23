MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
});

MyApp.addInitializer( function(options) {
  console.log("It's working!");
});

$(document).ready(function() {
  MyApp.start();
});


