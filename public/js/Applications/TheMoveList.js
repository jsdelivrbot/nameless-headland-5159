// Single Page Application that lets users pick a game and character
// and view command lists for an entire game

MyApp = new Backbone.Marionette.Application();

// Regions that exists in our index.erb
MyApp.addRegions({
  gameSelector: "#game-selector",
  characterSelector: "#character-selector",
  pageSelector: "#page-selector",
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
    $("option[value='"+characterId+"']").attr("selected", true);
    // Trigger the select event
    MyApp.gameStation.vent.trigger("character:selected", characterId);
  }
});

// Setup MyApp radio (should totally be replaced by Backbone.Radio eventually)
MyApp.gameStation = Backbone.Wreqr.radio.channel('selected-game');

// On the triggered event that a move set is selected / changed
MyApp.gameStation.vent.on("moveToggle", function(moveType) {
  $("." + moveType).toggle();
  var button = $("." + moveType + "Toggle")
  if (button.hasClass("dark")){
    button.removeClass("dark")
  } else {
    button.addClass("dark")
  }
  $(window).trigger('resize');
});

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

  // Build the page list
  var pages = new Backbone.Collection(game.get("pages"));
  if (pages.length > 1){
    pages.each(function(v,k){
      v.set("name", v.values().join(""));
    });

    // Build the page dropdown view
    var pageDropdown = new PageDropdown({
      collection: pages
    });
    MyApp.pageSelector.show( pageDropdown );
    document.getElementById("page-selector").style.display = "";
  } else {
    document.getElementById("page-selector").style.display = "none";
  }
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

  // remove old move toggles
  $('.moveTypeToggle').remove();
  for (moveType in moveTypeMap){
    css.innerHTML += "." + moveType + " {background:" + ColorMap(moveTypeMap[moveType]) + ";}";
    var toggleType = document.createElement("button");
    toggleType.className = moveType + "Toggle moveTypeToggle";
    toggleType.appendChild(document.createTextNode(moveType));
    toggleType.onclick = function(moveType) {
      return function(){
        MyApp.gameStation.vent.trigger("moveToggle", moveType)
      }
    }(moveType);
    var top = document.getElementById("top_menu");
    top.appendChild(toggleType);
  };
  document.head.appendChild(css);
  document.getElementById("direction_toggle").innerHTML = "while facing RIGHT (swipe to change)";
  $(window).trigger('resize');
});

// Event trigger when a character is selected
MyApp.gameStation.vent.on("character:selected", function(characterId) {

  // Change the URL to include the current character anchor
  MyApp.router.navigate(MyApp.gameId+"/"+characterId, false);

  // Scroll to the character view
  $("html, body").scrollTop($("table[id="+characterId+"]").offset().top
    - document.getElementById("fixed_top").clientHeight);
});
// Event trigger when a page is selected
MyApp.gameStation.vent.on("page:selected", function(page) {
  var moves = document.querySelectorAll('tr[page]');
  for (i=0; i < moves.length; i++){
    moves[i].style.display = "";
  }
  if (page !== "All Pages"){
    var hideMoves = document.querySelectorAll('tr[page]:not([page*="'+page+';"])');
    for (i=0; i < hideMoves.length; i++){
      hideMoves[i].style.display = "none";
    }
  }
  $(window).trigger('resize');
});

// When the page loads, kick off the app!
$(document).ready(function() {
  MyApp.start();
  Backbone.history.start({pushState: true, hashChange: false});
});

$(document).swipe({
  swipeRight:function(event, direction, distance, duration, fingerCount) {
    inputs = document.getElementsByClassName("flip");
    while(inputs.length != 0){
      $(inputs[0]).addClass("_flip");
      $(inputs[0]).removeClass("flip");
    }
    document.getElementById("direction_toggle").innerHTML =
      "while facing RIGHT (swipe to change)";
  },
  swipeLeft:function(event, direction, distance, duration, fingerCount) {
    inputs = document.getElementsByClassName("_flip");
    while(inputs.length != 0){
      $(inputs[0]).addClass("flip");
      $(inputs[0]).removeClass("_flip");
    }
    document.getElementById("direction_toggle").innerHTML =
      "while facing LEFT (swipe to change)";
  }
});

// functions for click elements on the page
function toggleTitle() {
  var startH = document.getElementById("top_menu").clientHeight;
  $(".title").slideToggle(400, function(){
    $(".toggle-title").toggle();
    $(window).trigger('resize');
    window.scrollBy(0, document.getElementById("top_menu").clientHeight);
    window.scrollBy(0, -startH);
  });
}
