// View for a Character Table Item (with complete move-set)

CharacterCabinet = Backbone.Marionette.CompositeView.extend({
  childView: CharacterView,
  childViewContainer: "div",
  template: Templite(
    '<div class="character-div"></div>'
  ),
  buildChildView: function(child, ChildViewClass, childViewOptions){
    // Build collection of Moves
    var moves = new Backbone.Collection(child.get("moves"));
    // Build child views with the moves as the collection of child elements
    var view = new ChildViewClass({
      model: child,
      collection: moves
    });
    return view;
  }
});
