GamesView = Backbone.Marionette.CollectionView.extend({
  childView: GameView,
  initialize: function() {
    console.log("Creating new Games View");
  }
});
