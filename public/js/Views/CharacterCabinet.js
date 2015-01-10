// View for a Character Table Item (with complete move-set)

CharacterCabinet = Backbone.Marionette.CompositeView.extend({
  initialize: function(options) {
    $(window).on("resize", this.resizeTables);
  },
  childView: CharacterView,
  childViewContainer: "div",
  template: Templite(
    '<div class="character-div"></div>'
  ),
  buildChildView: function(child, ChildViewClass, childViewOptions){
    // Build collection of Moves
    var moves = new Moves(child.get("moves"));
    setTimeout(function(){$(window).trigger("resize")},0); // trigger resize after moves
    // Build child views with the moves as the collection of child elements
    var view = new ChildViewClass({
      model: child,
      collection: moves
    });
    return view;
  },
  events: {
    "resize window": "resizeTables"
  },
  resizeTables: function() {
    if (parseInt($('.character-table').css('width')) <= parseInt(($('html').css('width'))) / 2){
      // resize tables to be equal column length
      $(".character-table").height(0);
      var maxHeight = 0;
      $(".character-table").each(function(){
        var height = $( this ).height();
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      $(".character-table").height((Math.ceil(maxHeight/10)+1)*10);
    } else {
      // don't resize if only one column
      $(".character-table").height(0);
    }
  }
});
