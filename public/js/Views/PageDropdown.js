// View for a Page Dropdown to select a page

PageDropdown = Backbone.Marionette.CompositeView.extend({
  childView: PageOption,
  childViewContainer: "select",
  template: Templite(
    '<select class="page-dropdown">' +
      '<option selected="selected">All Pages</option>' +
    '</select>'
  ),
  events: {
    "change" : "selectItem"
  },
  selectItem: function(){
    // Select the value with jQuery, and send the pageId to the App
    var pageId = $(".page-dropdown").val();
    MyApp.gameStation.vent.trigger("page:selected", pageId);
  }
});
