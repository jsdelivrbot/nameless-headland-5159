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
      "prereqHTML": this.divideRow("prereq")
    })
    this.set({
      "move_type": this.moveTypeDefault()
    });
    this.set({
      "hasNote": this.hideEmpty("note")
    });
    this.set({
      "hasPrereq": this.hideEmpty("prereq")
    })
    this.set({
      "prereqCount": this.prereqCount()
    })
  },
  imageFormat: function(dataType) {
    // setting up the move/note for avaliable images
    var moveImages = this.get(dataType);
    if (!_.isUndefined(moveImages)){
      return moveImages
        .replace(/\</g, '<span class="custom-button blue">')
        .replace(/\>/g, '</span>')
        .replace(/\[/g, '<img src="/img/')
        .replace(/\]/g,'.png" height="26" width="26">');
    }
  },
  divideRow: function(dataType){
    var rows = "";
    if (!_.isUndefined(this.get(dataType))){
      var prereqs = this.get(dataType).split("&");
      for (req in prereqs){
        rows += "<td class='move-prereq'>" + prereqs[req] + "</td>";
      }
    }
    return rows;
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
  },
  prereqCount: function(){
    if (_.isUndefined(this.get("prereq"))){
      return 1;
    } else {
      return this.get("prereq").split("&").length;
    }
  }
});
