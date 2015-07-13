TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/listShow"],
  tagName: "li class='list-show'",
  cardsSelector: ".cards-container",

  events: {
    "click .add-card-btn":"addCard"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "sync add", this.render);
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.$el.attr("id", this.model.id);
    var cards = this.model.cards()
    if(cards){
      cards.forEach( function (card) {
        var cardShow = new TrelloClone.Views.CardShow({ model: card, collection: this.model.cards() });
        this.addSubview(this.cardsSelector, cardShow);
      }.bind(this))
    }

    this.initializeListSorting();

    return this;
  },

  addCard: function (event) {
    event.preventDefault();
    var cardForm = new TrelloClone.Views.CardForm({list: this.model});
    $(event.delegateTarget).find(".buttons-container").empty();
    this.addSubview(this.cardsSelector, cardForm);
  },

  initializeListSorting: function () {
    $(".list-sortable").sortable({
      items: "> li.list-show",
      update: function (event, ui) {
        var sortedIds = $(".list-sortable").sortable("toArray");
        var ord = 0
        sortedIds.forEach( function (id) {
          var newOrd;
          var list = this.collection.get(id);
          if (list.id === parseInt(ui.item[0].id)){

            if (ord === 0){
              newOrd = 0
            } else if (ord === sortedIds.length - 1){
              newOrd = sortedIds.length - 1
            } else {
              leftList = this.collection.get(sortedIds[ord - 1]);
              rightList = this.collection.get(sortedIds[ord + 1]);
              newOrd = (leftList.get("ord") + rightList.get("ord"))/2
            }

            list.save({ord: newOrd}, {
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
