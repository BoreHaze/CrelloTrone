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
    var cards = this.model.cards()
    if(cards){
      cards.forEach( function (card) {
        var cardShow = new TrelloClone.Views.CardShow({ model: card });
        this.addSubview(this.cardsSelector, cardShow);
      }.bind(this))
    }

    TrelloClone.Helpers.initializeListSorting();

    return this;
  },

  addCard: function (event) {
    event.preventDefault();
    var cardForm = new TrelloClone.Views.CardForm({list: this.model});
    $(event.delegateTarget).find(".buttons-container").empty();
    this.addSubview(this.cardsSelector, cardForm);
  }

})
