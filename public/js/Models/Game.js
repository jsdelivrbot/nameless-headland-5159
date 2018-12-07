// Model for a Game

Game = Backbone.Model.extend({

  // Pulls from a specific data file that has character and style data
  url: function() {
    return "https://cdn.jsdelivr.net/gh/ethanjurman/fightersDatabase/games/"+this.id+".json"
  }
});
