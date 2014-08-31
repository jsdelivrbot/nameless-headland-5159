// Model for a Move
Move = Backbone.Model.extend({
  initialize: function() {
    this.set({
      "execHTML": this.imageFormat("exec")
    });
    this.set({
      "noteHTML": this.imageFormat("note")
    });
    this.set({
      "move_type": this.moveTypeDefault()
    });
    this.set({
      "hasNote": this.hideEmpty("note")
    });
    this.set({
      "hasPrereq": this.hideEmpty("prereq")
    })
  },
  imageFormat: function(dataType) {
    // setting up the move/note for avaliable images
    var moveImages = this.get(dataType);
    if (!_.isUndefined(moveImages)){
      return moveImages.replace(/\[/g, '<img src="/img/').replace(/\]/g,'.png">');
    }
  },
  moveTypeDefault: function(){
    // setting up the move type (if undefined, set the first one as default)
    if (_.isUndefined(this.get("move_type"))){
      return _.keys(MyApp.games.get(MyApp.gameId).get("move_types"))[0];
    }
    return this.get("move_type");
  },
  hideEmpty: function(dataType){
    if (_.isUndefined(this.get(dataType))) {
      return "hide";
    }
    return "";
  }
});
