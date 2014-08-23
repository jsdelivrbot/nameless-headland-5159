Games = Backbone.Collection.extend({
  model: Game,
  url: function() {
    return "https://rawgit.com/ethanjurman/fightersDatabase/master/games.json";
  },
});
