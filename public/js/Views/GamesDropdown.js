GamesDropdown = Backbone.Marionette.CompositeView.extend({
  childView: GameOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="game-dropdown"><option selected="selected">Select Game</option></select>'
  ),
  initialize: function() {
    console.log("Creating new Games Dropdown View");
  },
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    var gameId = $(".game-dropdown").val();
    if (gameId !== "Select Game") {
      console.log("selected: " + gameId);
      MyApp.gameStation.vent.trigger("game:selected", gameId);
    }
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
  }
});
