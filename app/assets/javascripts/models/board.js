TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',

  parse: function (response) {
    if (response.lists) {
      this.set("lists", new TrelloClone.Collections.Lists(response.lists));
      delete response.lists;
    }
    return response;
  }
})
