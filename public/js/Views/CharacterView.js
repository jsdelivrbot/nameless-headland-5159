CharacterView = Backbone.Marionette.CompositeView.extend({
  childView: MoveView,
  childViewContainer: "table",
  template: Templite(
    '<table class="character-table"><tr><td><%= args.name %></td></tr></table>'
  ),
  initialize: function() {
    console.log("table for move");
  }
});
