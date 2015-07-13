TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/cardShow"],
  tagName: "li class='card-show card-draggable'",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.initializeCardSorting();
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    this.$el.attr("id", this.model.id);
    return this;
  },

  initializeCardSorting: function () {
    $(".cards-sortable").sortable({
      connectWith: ".cards-sortable",
      items: "> li.card-show",
      update: function (event, ui) {
        var sortedIds = $(event.target).sortable("toArray");
        var ord = 0
        sortedIds.forEach( function (id) {
          var newOrd;
          var card = this.collection.get(id);
          console.log(sortedIds)
          console.log(this.collection);
          if (card.id === parseInt(ui.item[0].id)){
            var listId;
            if (ord === 0){
              newOrd = 0
              listId = this.collection.get(sortedIds[ord + 1]).get("list_id");
            } else if (ord === sortedIds.length - 1){
              newOrd = sortedIds.length - 1
              listId = this.collection.get(sortedIds[ord - 1]).get("list_id");
            } else {
              leftCard = this.collection.get(sortedIds[ord - 1]);
              rightCard = this.collection.get(sortedIds[ord + 1]);
              newOrd = (leftCard.get("ord") + rightCard.get("ord"))/2
              listId = this.collection.get(sortedIds[ord - 1]).get("list_id");
            }

            card.save({ord: newOrd, list_id: listId }, {
              success: function (model) {
                this.collection.add(model, {merge: true})
              }.bind(this)
            });

          }
          ord++;
        }.bind(this))
      }.bind(this)
    })
  }


})
