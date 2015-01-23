// View for a Page Option in a dropdown

PageOption = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value='" + this.model.get("name") + "'";
  },
  template: Templite("<%= args.name %>")
});
