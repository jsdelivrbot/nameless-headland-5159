CharacterView = Backbone.Marionette.CompositeView.extend({
  childView: MoveView,
  childViewContainer: "table",
  template: Templite(
    '<table class="character-table"><tr><th><%= args.name %></th></tr></table>'
  ),
  initialize: function() {
    console.log("table for move");
  }
});
