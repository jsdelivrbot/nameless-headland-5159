Character = Backbone.Model.extend({
  idAttribute: "name",
  initialize: function(options) {
    console.log("Making Character");
    console.log("Found Character with id: "+this.id);
    console.log("Found Character with name: "+this.get("name"));
  }
});
