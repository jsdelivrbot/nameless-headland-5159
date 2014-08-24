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
  gamesDropdown = new GamesDropdown({
    collection: games
  });
  this.gameSelector.show( gamesDropdown );

});

MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');
MyApp.gameStation.vent.on("game:selected", function(game) {
  console.log("The App knows that "+game.id+" was selected!");
  characters = new Characters(game);
  charactersDropdown = new CharactersDropdown({
    collection:
  });
  MyApp.characterSelector.show( charactersDropdown );
});

$(document).ready(function() {
  MyApp.start();
});
