// View for a Game Option in a dropdown

GameOption = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value=" + this.model.id;
  },
  template: Templite("<%= args.name %>")
});
