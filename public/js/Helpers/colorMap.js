ColorMap = function(color){
  var newColor = "";
  switch(color){
    case "red":
      newColor = "rgb(184, 81, 81)"
      break;
    case "green":
      newColor = "rgb(81, 184, 81)"
      break;
    case "blue":
      newColor = "rgb(81, 81, 184)"
      break;
    case "tan":
      newColor = "rgb(210, 180, 140)"
      break;
    case "teal":
      newColor = "rgb(81, 184, 184)"
      break;
    case "purple":
      newColor = "rgb(184, 81, 184)"
      break;
    case "darkgray":
      newColor = "rgb(81, 81, 81)"
      break;
    case "lightgray":
      newColor = "rgb(184, 184, 184)"
      break;
    default:
      newColor = color
      break;
  }
  return newColor;
}
