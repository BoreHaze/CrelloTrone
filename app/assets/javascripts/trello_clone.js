window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Helpers: {},
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    TrelloClone.boards.fetch({
      success: function() {
        var router = new TrelloClone.Routers.Router({
          $rootEl: $('#main'),
          boards: TrelloClone.boards
        });

        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
