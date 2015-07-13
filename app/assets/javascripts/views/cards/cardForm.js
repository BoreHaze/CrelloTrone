TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["cards/cardForm"],
  tagName: "li class='card-form'",

  events: {
    "click .submit-card-btn":"submitCard",
    "click .cancel-card-btn":"cancelCard"
  },

  initialize: function (options) {
    this.list = options.list
    this.model = new TrelloClone.Models.Card({list_id: this.list.id});
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  },

  submitCard: function (event) {
    this.model.set("title", $(event.delegateTarget).find(".card-title-text").val());
    this.model.save({}, {
      success: function () {
        this.list.cards().add(this.model);
        this.$el.empty();
        this.remove();
      }.bind(this)
    })
  },

  cancelCard: function (event) {
    this.$el.empty();
    this.remove();
    this.list.fetch();
  }

})
