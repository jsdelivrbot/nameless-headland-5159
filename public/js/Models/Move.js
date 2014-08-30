// Model for a Move
Move = Backbone.Model.extend({
  initialize: function() {
    this.set({
      "execHTML": this.execParse()
    });
    this.set({
      "move_type": this.moveTypeDefault()
    });
    this.set({
      "hasNote": this.hasNote()
    });
  },
  execParse: function() {
    // setting up the exec to avaliable images
    var moveImages = "";
    var strings = this.get("exec").split(" ");
    for (input in strings){
      var url = '/img/'+ strings[input] + '.png';
      moveImages += '<img src="' + url + '">';
    }
    return moveImages;
  },
  moveTypeDefault: function(){
    // setting up the move type (if undefined, set the first one as default)
    if (_.isUndefined(this.get("move_type"))){
      return _.keys(MyApp.games.get(MyApp.gameId).get("move_types"))[0];
    }
    return this.get("move_type");
  },
  hasNote: function(){
    if (_.isUndefined(this.get("note"))) {
      return "hide";
    }
    return "";
  }
});
