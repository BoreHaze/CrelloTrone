TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST["cards/cardShow"],
  tagName: "li class='card-show'",

  initialize: function (options) {
    this.card = options.card;
    this.listenTo(this.card, "sync", this.render);
  },

  render: function () {
    console.log("in card render");
    this.$el.html(this.template({ card: this.card }));
    return this;
  }
  
})
