Templite = function(htmlPath) {
  return function(serialObject) {
    return _.template($.get(htmlPath), serialObject, {variable: "args"});
  }
}

