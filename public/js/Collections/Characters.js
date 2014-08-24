Characters = Backbone.Collection.extend({
  model: Character,
  initialize: function() {
    console.log("Creating characters collection");
  }
});
