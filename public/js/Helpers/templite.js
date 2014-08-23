Templite = function(htmlPath) {
  return function(serialObject) {
    return _.template(htmlPath, serialObject, {variable: "args"});
  }
}

