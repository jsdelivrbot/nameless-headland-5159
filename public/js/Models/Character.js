// Model for a character

Character = Backbone.Model.extend({
  idAttribute: function() {
    return MyApp.games.get(MyApp.gameId).get("characters").indexOf(this.get("name"));
  }
});
