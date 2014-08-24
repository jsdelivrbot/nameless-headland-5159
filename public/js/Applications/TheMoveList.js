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

MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');
MyApp.gameStation.vent.on("game:selected", function(game) {
  console.log("The App knows that a "+game+" was selected!");
});

$(document).ready(function() {
  MyApp.start();
});
