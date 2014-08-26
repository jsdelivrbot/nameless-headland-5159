// Helper function that builds html elements for a view

Templite = function(htmlPath) {
  return function(serialObject) {
    return _.template(htmlPath, serialObject, {variable: "args"});
  }
}
