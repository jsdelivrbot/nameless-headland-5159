MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
});

MyApp.addInitializer( function(options) {

  console.log("building games collection");
  games = new Games();
  games.fetch({
    async: false
  });

  console.log("building games view");
  gamesView = new GamesView({
    collection: games
  });
  this.mainRegion.show( gamesView );
});

$(document).ready(function() {
  MyApp.start();
});
