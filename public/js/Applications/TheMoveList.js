MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  gameSelector: "#game-selector",
  characterSelector: "#character-selector",
  characters: "#characters"
});

MyApp.addInitializer( function(options) {

  console.log("building games collection");
  MyApp.games = new Games();
  MyApp.games.fetch({
    async: false
  });

  console.log("building games view");
  var gamesDropdown = new GamesDropdown({
    collection: MyApp.games
  });
  this.gameSelector.show( gamesDropdown );

  MyApp.gameId = $("div.local-data").attr("game-data-id");
  characterId = $("div.local-data").attr("character-data-id");
  if(MyApp.gameId !== "") {
    console.log("Found game from route: " + MyApp.gameId);
    $("option[value='"+MyApp.gameId+"']").attr("selected", true)
    MyApp.gameStation.vent.trigger("game:selected", MyApp.gameId);
  }
  if(characterId !== "") {
    console.log("Found character from route: " + characterId);
  }

});

MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');
MyApp.gameStation.vent.on("game:selected", function(gameId) {
  MyApp.gameId = gameId
  console.log("The App knows that "+gameId+" was selected!");
  MyApp.games.get(gameId).fetch({
    async: false
  });
  var game = MyApp.games.get(gameId);
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
