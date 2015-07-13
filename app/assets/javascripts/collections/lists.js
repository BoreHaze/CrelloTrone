TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: '/api/lists',
  model: TrelloClone.Models.List,

  comparator: "ord",

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
