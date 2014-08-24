GameView = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value=" + this.model.id;
  },
  template: Templite("<%= args.name %>"),
  initialize: function() {
    console.log("Creating a Game View");
  }
});
