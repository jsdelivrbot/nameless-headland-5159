// View for a single move in a Character View

MoveView = Backbone.Marionette.ItemView.extend({
  tagName: function(){
    // setting up the move type (if undefined, set the first one as default)
    if (_.isUndefined(this.model.get("move_type"))){
      this.model.set({
        "move_type":_.keys(MyApp.games.get(MyApp.gameId).get("move_types"))[0]
      });
    }

    return 'tr class="move-element '+this.model.get("move_type")+'"'
  },
  template: Templite("","/templates/move.html")
});
