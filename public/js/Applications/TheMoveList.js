MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  gameSelector: "#game-selector",
  characterSelector: "#character-selector",
  characters: "#characters"
});

MyApp.addInitializer( function(options) {

  console.log("building games collection");
  games = new Games();
  games.fetch({
    async: false
  });

  console.log("building games view");
  gamesView = new GamesDropdown({
    collection: games
  });
  this.gameSelector.show( gamesView );
});

$(document).ready(function() {
  MyApp.start();
});
