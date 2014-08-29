// Model for a Move
Move = Backbone.Model.extend({
  initialize: function() {
    this.set({
      "execHTML":this.execParse()
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
  }
});
