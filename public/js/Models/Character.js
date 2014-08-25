Character = Backbone.Model.extend({
  idAttribute: function() {
    return MyApp.games.get(MyApp.gameId).get("characters").indexOf(this.get("name"));
  },
  initialize: function(options) {
    console.log("Making Character");
    console.log("Found Character with id: "+this.id);
    console.log("Found Character with name: "+this.get("name"));
  }
});
