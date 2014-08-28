// View for a character (and moves) in the table view

CharacterView = Backbone.Marionette.CompositeView.extend({
  childView: MoveView,
  childViewContainer: "table",
  template: Templite("", "/templates/character.html")
});
