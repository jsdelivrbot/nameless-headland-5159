// View for a single move in a Character View

MoveView = Backbone.Marionette.ItemView.extend({
  tagName: function() {
    return 'tr class="move-element '+this.model.get("type")+'"';
  },
  template: Templite("","/templates/move.html")
});
