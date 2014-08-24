GameView = Backbone.Marionette.ItemView.extend({
  //template: Templite("<%= args.name %>"),
  template: Templite("public/templates/GameView.html"),
  tagName: function(){
    return "option value=" + this.model.id;
  },
  initialize: function() {
    console.log("Creating a Game View");
  }
});
