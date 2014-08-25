CharacterOption = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value=" + this.model.get("id");
  },
  template: Templite("<%= args.name %>"),
  initialize: function() {
    console.log("Creating a Character Option View");
  }
});
