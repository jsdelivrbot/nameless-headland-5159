CharacterOption = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return "option value=" + this.model;
  },
  template: Templite("<%= args %>"),
  initialize: function() {
    console.log("Creating a Character Option View");
  }
});
