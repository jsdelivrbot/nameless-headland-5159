// Template Model in Backbone
URLModel = Backbone.Model.extend({
  url: function() {
    return this.path
  },
  initialize: function(options) {
    this.path = options.path
  }
});

// Helper function that builds html elements for a view
Templite = function(erb, url) {
  return function(serialObject) {
    var template_html = erb;
    // shouldn't be calling the ajax every time
    if (!_.isUndefined(url)){
      template_model = new URLModel({path:url});
      template_html = template_model.fetch({async:false}).responseText;
    }
    return _.template(template_html, serialObject, {variable: "args"});
  }
}
