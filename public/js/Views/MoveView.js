// View for a single move in a Character View

MoveView = Backbone.Marionette.ItemView.extend({
  initialize: function() {
    // setting up the exec to avaliable images
    var moveImages = "";
    var strings = this.model.get("exec").split(" ");
    for (input in strings){
      var url = '/img/'+ strings[input] + '.png';
      moveImages += '<img src="' + url + '">';
    }
    this.model.set({
      "exec":moveImages
    });
  },
  tagName: function(){
    // setting up the move type (if undefined, set the first one as default)
    if (_.isUndefined(this.model.get("move_type"))){
      this.model.set({
        "move_type":_.keys(MyApp.games.get(MyApp.gameId).get("move_types"))[0]
      });
    }

    return 'tr class="move-element '+this.model.get("move_type")+'"'
  },
  template: Templite(
    '<td class="move-name">' +
      '<%= args.name %>' +
    '</td>' +
    '<td class="move-exec <%= args.move_type %>" style="background-color:white;">' +
      '<%= args.exec %>' +
      '<div class="move-note">' +
        '<%= args.note %>' +
      '</div>' +
  '</td>'
  )
});
