TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["cards/cardForm"],
  tagName: "li class='card-form'",

  events: {
    "click .submit-card-btn":"submitCard",
    "click .cancel-card-btn":"cancelCard"
  },

  initialize: function (options) {
    this.list = options.list;
    this.card = new TrelloClone.Models.Card({list_id: this.list.id});
  },

  render: function () {
    this.$el.html(this.template({ card: this.card }));
    return this;
  },

  submitCard: function (event) {
    this.card.set("title", $(event.delegateTarget).find(".card-title-text").val());
    this.card.save({
      success: function (model) {
        console.log("In sucess cb");
        this.list.cards().add(model);
        this.$el.empty();
        this.remove();
      }.bind(this)
    })
  }

})
