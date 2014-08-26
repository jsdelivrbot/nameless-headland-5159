// View for a Character Dropdown to select a character

CharactersDropdown = Backbone.Marionette.CompositeView.extend({
  childView: CharacterOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="character-dropdown">' +
      '<option selected="selected">All</option>' +
    '</select>'
  ),
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    // Select the value with jQuery, and send the characterId to the App
    var characterId = $(".character-dropdown").val();
    if (characterId !== "All") {
      MyApp.gameStation.vent.trigger("character:selected", characterId);
    }
  }
});
