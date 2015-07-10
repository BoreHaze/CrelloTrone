TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: '/api/lists',
  model: TrelloClone.Models.List,

  initialize: function (lists) {
    lists.forEach( function (list) {
      var newList = new TrelloClone.Models.List();
      newList.set("cards", new TrelloClone.Collections.Cards(list.cards));
      this.models.push(newList);
    }.bind(this));

    delete lists;
  },

  getOrFetch: function (id) {
    var list = this.get(id);
    if(!list){
      list = new TrelloClone.Models.List({ id: id });
      this.add(list);
    }

    list.fetch();
    return list;
  }
})
