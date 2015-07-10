TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/cardShow"],
  tagName: "li class='card-show'",

  initialize: function (options) {
    this.card = options.card;
    this.listenTo(this.card, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ card: this.card }));
    return this;
  }

})
