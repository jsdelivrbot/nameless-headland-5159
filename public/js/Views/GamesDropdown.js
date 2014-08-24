GamesDropdown = Backbone.Marionette.CompositeView.extend({
  childView: GameOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="game-dropdown"> \
    <option selected="selected">Select Game</option> \
    </select>'
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
      this.collection.get(gameId).fetch();
      var selectedGame = this.collection.get(gameId);
      console.log(selectedGame);
      MyApp.gameStation.vent.trigger("game:selected", selectedGame);
    }
  }
});
