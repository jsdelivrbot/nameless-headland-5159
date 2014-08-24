Character = Backbone.Model.extend({
  initialize: function(options) {
    console.log("Making Character");
    console.log("Found Character with id: "+this.get("id"));
    console.log("Found Character with name: "+this.get("name"));
  },
});
