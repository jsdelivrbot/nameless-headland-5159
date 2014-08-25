MoveView = Backbone.Marionette.ItemView.extend({
  tagName: 'tr class="move-element" class="<%= args.move_type %>"',
  template: Templite(
    '<td class="move-name"><%= args.name %></td><td class="move-exec"><%= args.exec %></td><td class="move-note"><%= args.note %></td>'
  ),
  initialize: function() {
    console.log("move rendered");
  }
});
