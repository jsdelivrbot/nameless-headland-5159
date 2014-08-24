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
    var gameId = $(".game-dropdown").val();
    console.log("selected: " + gameId);
    this.collection.get(gameId).fetch();
    console.log(this.collection.get(gameId));
  }
});
