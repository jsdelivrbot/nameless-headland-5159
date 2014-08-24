Character = Backbone.Model.extend({
  initialize: function(options) {
    console.log("Making Character");
    console.log("Found Game with id: "+this.get("id"));
    console.log("Found Game with name: "+this.get("name"));
  },
});
