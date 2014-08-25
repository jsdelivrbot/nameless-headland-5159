MoveView = Backbone.Marionette.ItemView.extend({
  tagName: 'tr class="move-element" class="<%= args.move_type %>"',
  template: Templite(
    '<td><%= args.name %></td><td><%= args.exec %></td><td><%= args.notes %></td>'
  ),
  initialize: function() {
    console.log("move rendered");
  }
});
