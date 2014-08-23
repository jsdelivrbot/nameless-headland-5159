GameView = Backbone.Marionette.ItemView.extend({
  template: Templite("<%= args.id %>"),
  initialize: function() {
    console.log("Creating a Game View");
  }
});
