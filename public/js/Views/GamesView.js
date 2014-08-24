GamesView = Backbone.Marionette.CompositeView.extend({
  childView: GameView,
  childViewContainer: "select",
  template: Templite("<select class='game-dropdown'></select>"),
  initialize: function() {
    console.log("Creating new Games View");
  },
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    console.log("selected: " + $(".game-dropdown").val());

  }
});
