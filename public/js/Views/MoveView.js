MoveView = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    return 'tr class="move-element '+this.model.get("move_type")+'"'
  },
  template: Templite(
    '<td class="move-name"><%= args.name %></td><td class="move-exec"><%= args.exec %></td><td class="move-note"><%= args.note %></td>'
  ),
  initialize: function() {
    console.log("move rendered");
  }
});
