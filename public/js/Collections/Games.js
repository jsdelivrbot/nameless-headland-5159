// Collection of Game Models

Games = Backbone.Collection.extend({
  model: Game,
  // Pulls from a top-level document that contains all the games/ids
  url: function() {
    return "https://cdn.jsdelivr.net/gh/ethanjurman/fightersDatabase/games.json";
  },
});
