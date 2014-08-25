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
    $("option[value='"+characterId+"']").attr("selected", true)
    MyApp.gameStation.vent.trigger("character:selected", characterId);
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
  var sortedChar = characters.sortBy( function(char) {
      return char.get("name").toLowerCase();
  });
  characters.reset( sortedChar );

  characters.each(function(v, k) {
    v.set("id", k);
  });

  var charactersDropdown = new CharactersDropdown({
    collection: characters
  });
  MyApp.characterSelector.show( charactersDropdown );
  var characterCab = new CharacterCabinet({
    collection: characters
  });
  MyApp.characters.show( characterCab );

  if ($("#move-type-style").length > 0){
    document.getElementById("move-type-style").remove();
  }
  var moveTypeMap = MyApp.games.get(gameId).get("move_types");
  var css = document.createElement("style");
  css.id = "move-type-style";
  css.type = "text/css";
  for (move in moveTypeMap){
    css.innerHTML += "tr." + move + "{background:" + moveTypeMap[move] + ";}";
  };
  document.head.appendChild(css);
});

MyApp.gameStation.vent.on("character:selected", function(characterId) {
  console.log("The App knows that "+characterId+" was selected!");
});

$(document).ready(function() {
  MyApp.start();
});
