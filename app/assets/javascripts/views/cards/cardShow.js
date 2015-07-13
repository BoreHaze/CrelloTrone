TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/cardShow"],
  tagName: "li class='card-show card-draggable'",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    TrelloClone.Helpers.initializeCardSorting();
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }

})
