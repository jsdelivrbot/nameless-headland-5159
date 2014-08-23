Game = Backbone.Model.extend({
  initialize: function(options) {
    console.log("Making Game");
    console.log("Found Game with id: "+this.get("id"));
    console.log("Found Game with name: "+this.get("name"));
  },
  url: function() {
    return "https://rawgit.com/ethanjurman/fightersDatabase/master/"+this.id+"/game_data.json"
  }
});
