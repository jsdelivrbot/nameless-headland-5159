// View for a character (and moves) in the table view

CharacterView = Backbone.Marionette.CompositeView.extend({
  childView: MoveView,
  childViewContainer: "table",
  template: Templite(
    '<table class="character-table"><tr><th colspan="3"><%= args.name %></th></tr></table>'
  )
});
