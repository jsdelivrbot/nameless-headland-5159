// View for a Games Dropdown to select a game

GamesDropdown = Backbone.Marionette.CompositeView.extend({
  childView: GameOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="game-dropdown dropdown">' +
      '<option selected="selected">Game Select</option>' +
    '</select>'
  ),
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    // Select the value with jQuery, and send the gameId to the App
    var gameId = $(".game-dropdown").val();
    if (gameId !== "Select Game") {
      MyApp.gameStation.vent.trigger("game:selected", gameId);
    }
  }
});
