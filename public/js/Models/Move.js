// Model for a Move
Move = Backbone.Model.extend({
  initialize: function() {
    this.set({
      "execHTML": this.imageFormat("exec")
    });
    this.set({
      "noteHTML": this.imageFormat("note")
    });
    this.set({
      "prereqHTML": this.divideRow("prereq")
    })
    this.set({
      "type": this.moveTypeDefault()
    });
    this.set({
      "hasNote": this.hideEmpty("note")
    });
    this.set({
      "hasPrereq": this.hideEmpty("prereq")
    })
    this.set({
      "prereqCount": this.prereqCount()
    })
  },
  imageFormat: function(dataType) {
    // setting up the move/note for avaliable images
    var moveImages = this.get(dataType);
    if (!_.isUndefined(moveImages)){
      return moveImages
        .replace(/<([^>]*)>/g, '<span class="custom-button raised-button">$1</span>')
        .replace(/\[([^\]]*)\]/g, this.expandCommand)
    }
  },
  expandCommand: function(match){
    makeImage = function(path, classes){
      var img = document.createElement("img");
      img.setAttribute("src",path);
      img.setAttribute("class",classes || "");

      return img;
    };

    makeButton = function(button, classes, location){
      return mergeButtons([button],classes);
    };

    mergeButtons = function(buttons, classes){
      // if classes isn't an array, make it one
      classes = classes || "";
      if (!Array.isArray(classes)){
        classes = Array.apply(null, new Array(buttons.length))
          .map(String.prototype.valueOf,classes);
      }
      var span = document.createElement("span");

      var first = makeImage("/img/96_blank.png");
      first.className = classes[0];
      for(b in buttons){
        var i = makeImage(buttons[b]);
        i.className = classes[b];
        i.setAttribute("style","position:absolute;z-index:1;")
        span.appendChild(i);
      }
      span.appendChild(first);
      return span;
    };

    var html = document.createElement("div");
    // returns a string of a img tag holding the correct image from the input command
    if (match.match(/(\[[012346789]\])/g)){
      html.appendChild(makeButton("/img/96_input_yellow_arrow.png","img-input rotate" + match[1]));
    }
    if (match.match(/(\[h[012346789]\])/g)){
      html.appendChild(mergeButtons(["/img/96_input_yellow_arrow.png","/img/96_hold.png"],["img-input rotate" + match[2],"img-input"]));
    }
    if (match.match(/\[(white|gray|black|red|yellow|orange|green|teal|purple|blue)-(w|b)-([^\]]*)\]/g)){
      var matches = /\[(white|gray|black|red|yellow|orange|green|teal|purple|blue)-(w|b)-([^\]]*)\]/g.exec(match);
      html.appendChild(mergeButtons([
        "/img/96_button_" + matches[1] + ".png",
        "/img/96_" + (matches[2] == "w" ? "white" : "black") + "_" + matches[3] + ".png"],"img-input"));
    }
    switch(match){
      case "[lk]":
        html.appendChild(mergeButtons(["/img/96_kick_light.png","/img/96_text_K.png","/img/96_text_L.png"],"img-input"));
        break;
      case "[mk]":
        html.appendChild(mergeButtons(["/img/96_kick_medium.png","/img/96_text_K.png","/img/96_text_M.png"],"img-input"));
        break;
      case "[hk]":
        html.appendChild(mergeButtons(["/img/96_kick_heavy.png","/img/96_text_K.png","/img/96_text_H.png"],"img-input"));
        break;
      case "[lp]":
        html.appendChild(mergeButtons(["/img/96_punch_light.png","/img/96_text_P.png","/img/96_text_L.png"],"img-input"));
        break;
      case "[mp]":
        html.appendChild(mergeButtons(["/img/96_punch_medium.png","/img/96_text_P.png","/img/96_text_M.png"],"img-input"));
        break;
      case "[hp]":
        html.appendChild(mergeButtons(["/img/96_punch_heavy.png","/img/96_text_P.png","/img/96_text_H.png"],"img-input"));
        break;
      case "[k]":
        html.appendChild(makeButton("/img/96_Kick.png","img-input"));
        break;
      case "[p]":
        html.appendChild(makeButton("/img/96_Punch.png","img-input"));
        break;
      case "[2k]":
        html.appendChild(makeButton("/img/96_2xKick.png","img-input"));
        break;
      case "[2p]":
        html.appendChild(makeButton("/img/96_2xPunch.png","img-input"));
        break;
      case "[3k]":
        html.appendChild(makeButton("/img/96_3xKick.png","img-input"));
        break;
      case "[3p]":
        html.appendChild(makeButton("/img/96_3xPunch.png","img-input"));
        break;
      case "[214]":
        html.appendChild(makeButton("/img/96_input_yellow_qcb.png","img-input"));
        break;
      case "[63214]":
        html.appendChild(makeButton("/img/96_input_yellow_hcb.png","img-input"));
        break;
      case "[421]":
        html.appendChild(makeButton("/img/96_input_yellow_rdp.png","img-input"));
        break;
      case "[236]":
        html.appendChild(makeButton("/img/96_input_yellow_qcf.png","img-input"));
        break;
      case "[41236]":
        html.appendChild(makeButton("/img/96_input_yellow_hcf.png","img-input"));
        break;
      case "[623]":
        html.appendChild(makeButton("/img/96_input_yellow_dp.png","img-input"));
        break;
      case "[63214789]":
        html.appendChild(makeButton("/img/96_input_yellow_fcf.png","img-input"));
        break;
      case "[41236987]":
        html.appendChild(makeButton("/img/96_input_yellow_fcb.png","img-input"));
        break;
    }
    return html.innerHTML;
  },
  divideRow: function(dataType){
    var rows = "";
    if (this.get(dataType) != ""){
      var prereqs = this.get(dataType).split("&");
      for (req in prereqs){
        rows += "<td class='move-prereq'>" + prereqs[req] + "</td>";
      }
    }
    return rows;
  },
  moveTypeDefault: function(){
    // setting up the move type (if undefined, set the first one as default)
    if (_.isUndefined(this.get("type"))){
      return _.keys(MyApp.games.get(MyApp.gameId).get("move_types"))[0];
    }
    return this.get("type");
  },
  hideEmpty: function(dataType){
    if (this.get(dataType) == "") {
      return "hide";
    }
    return "";
  },
  prereqCount: function(){
    if (_.isUndefined(this.get("prereq"))){
      return 1;
    } else {
      return this.get("prereq").split("&").length;
    }
  }
});
