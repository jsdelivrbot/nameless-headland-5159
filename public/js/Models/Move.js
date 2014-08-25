Move = Backbone.Model.extend({
  initialize: function(options) {
    console.log("Making move");
    console.log("Found Move with id: "+this.get("id"));
    console.log("Found Move with name: "+this.get("name"));
  },
});
