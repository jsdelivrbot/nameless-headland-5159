// View for a Character Option in a dropdown

CharacterOption = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value=" + this.model.get("id");
  },
  template: Templite("<%= args.name %>")
});
