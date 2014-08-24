CharactersDropdown = Backbone.Marionette.CompositeView.extend({
  childView: CharacterOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="character-dropdown"> \
    <option selected="selected">All</option> \
    </select>'
  ),
  initialize: function() {
    console.log("Creating new Characters Dropdown View");
  },
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    var characterName = $(".character-dropdown").val();
    if (characterName !== "All") {
      console.log("selected: " + characterName);
    }
  }
});
