// Single Page Application that lets users pick a game and character
// and view command lists for an entire game

MyApp = new Backbone.Marionette.Application();

// Regions that exists in our index.erb
MyApp.addRegions({
  gameSelector: "#game-selector",
  characterSelector: "#character-selector",
  characters: "#characters"
});

// Function called after page is initialized
MyApp.addInitializer( function(options) {

  // Set up routes (for navigating to a new game)
  MyApp.router = new GameRouter();

  // Build and fetch games list
  MyApp.games = new Games();
  MyApp.games.fetch({
    async: false
  });

  // Building games dropdown with MyApp.games
  var gamesDropdown = new GamesDropdown({
    collection: MyApp.games
  });
  this.gameSelector.show( gamesDropdown );

  // Check if there are any parameters passed in url
  MyApp.gameId = $("div.local-data").attr("game-data-id");
  characterId = $("div.local-data").attr("character-data-id");

  // if we have a game id in the url
  if(MyApp.gameId !== "") {
    // Select that game in the dropdown
    $("option[value='"+MyApp.gameId+"']").attr("selected", true)
    // Trigger the select event
    MyApp.gameStation.vent.trigger("game:selected", MyApp.gameId);
  }
  // if we have a character id in the url
  if(characterId !== "") {
    // Select that character in the dropdown
    $("option[value='"+characterId+"']").attr("selected", true)
    // Trigger the select event
    MyApp.gameStation.vent.trigger("character:selected", characterId);
  }

});

// Setup MyApp radio (should totally be replaced by Backbone.Radio eventually)
MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');

// On the triggered event that a game is selected (via dropdown or url)
MyApp.gameStation.vent.on("game:selected", function(gameId) {
  MyApp.gameId = gameId

  // Fetch the data for that game
  MyApp.games.get(gameId).fetch({
    async: false
  });
  var game = MyApp.games.get(gameId);
  
  // Change the URL to include the current gameId
  MyApp.router.navigate(gameId, false);

  // Build the characters list (which also has the moves list)
  var characters = new Backbone.Collection(game.get("characters"));

  // Sort the list by name (lowercased)
  var sortedChar = characters.sortBy( function(char) {
      return char.get("name").toLowerCase();
  });
  // Save the sorted list to the characters collection
  characters.reset( sortedChar );

  // Set the id of each character to it's sorted index
  characters.each(function(v, k) {
    v.set("id", k);
  });

  // Build the characters dropdown view
  var charactersDropdown = new CharactersDropdown({
    collection: characters
  });
  MyApp.characterSelector.show( charactersDropdown );

  // Build the characters view under the dropdowns
  var characterCab = new CharacterCabinet({
    collection: characters
  });
  MyApp.characters.show( characterCab );

  // Add CSS styling based on selected game
  if ($("#move-type-style").length > 0){
    document.getElementById("move-type-style").remove();
  }
  var moveTypeMap = MyApp.games.get(gameId).get("move_types");
  var css = document.createElement("style");
  css.id = "move-type-style";
  css.type = "text/css";
  for (moveType in moveTypeMap){
    css.innerHTML += "." + moveType + " {background:" + ColorMap(moveTypeMap[moveType]) + ";" +
    "border-color:" + ColorMap(moveTypeMap[moveType]) + ";}";
  };
  document.head.appendChild(css);

});

// Event trigger when a character is selected
MyApp.gameStation.vent.on("character:selected", function(characterId) {

  // Change the URL to include the current character anchor
  MyApp.router.navigate(MyApp.gameId+"/"+characterId, false);

  // Scroll to the character view
  $("html, body").scrollTop($("table[id="+characterId+"]").offset().top);

});

// When the page loads, kick off the app!
$(document).ready(function() {
  MyApp.start();
  Backbone.history.start({pushState: true, hashChange: false});
});
