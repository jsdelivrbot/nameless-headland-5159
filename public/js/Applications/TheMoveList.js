MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  gameSelector: "#game-selector",
  characterSelector: "#character-selector",
  characters: "#characters"
});

MyApp.addInitializer( function(options) {

  console.log("building games collection");
  var games = new Games();
  games.fetch({
    async: false
  });

  console.log("building games view");
  var gamesDropdown = new GamesDropdown({
    collection: games
  });
  this.gameSelector.show( gamesDropdown );

});

MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');
MyApp.gameStation.vent.on("game:selected", function(game) {
  console.log("The App knows that "+game.id+" was selected!");
  var characters = new Characters(game.get("characters"));
  var charactersDropdown = new CharactersDropdown({
    collection: characters
  });
  MyApp.characterSelector.show( charactersDropdown );
  var characterCab = new CharacterCabinet({
    collection: characters
  });
  MyApp.characters.show( characterCab );
});

$(document).ready(function() {
  MyApp.start();
});
