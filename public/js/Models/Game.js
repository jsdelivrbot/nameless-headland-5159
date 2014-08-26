// Model for a Game

Game = Backbone.Model.extend({

  // Pulls from a specific data file that has character and style data
  url: function() {
    return "https://rawgit.com/ethanjurman/fightersDatabase/master/games/"+this.id+".json"
  }
});
