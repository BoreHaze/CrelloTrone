TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/listShow"],
  tagName: "li class='list-show'",
  cardsSelector: ".cards-container",

  initialize: function (options) {
    this.list = options.list;
    this.listenTo(this.list, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ list: this.list }));
    var cards = this.list.cards()
    if(cards){
      cards.forEach( function (card) {
        var cardShow = new TrelloClone.Views.CardShow({ card: card });
        this.addSubview(this.cardsSelector, cardShow);
      }.bind(this))
    }
    return this;
  }

})
