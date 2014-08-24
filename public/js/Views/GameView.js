GameView = Backbone.Marionette.ItemView.extend({
  //template: Templite("<%= args.id %>"),
  template: Templite("public/templates/GameView.html"),
  initialize: function() {
    console.log("Creating a Game View");
  }
});
