CharacterCabinet = Backbone.Marionette.CompositeView.extend({
  childView: CharacterView,
  childViewContainer: "div",
  template: Templite(
    '<div class="character-div"></div>'
  ),
  initialize: function() {
    console.log("div for character");
  },
  buildChildView: function(child, ChildViewClass, childViewOptions){
    console.log("building moves view");
    var moves = new Moves(child.get("moves"));
    var view = new ChildViewClass({
      model: child,
      collection: moves
    });
    return view;
  }
});
