TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST["lists/listForm"],
  tagName: "div class='list-form'",

  events: {
    "click .submit-list-btn":"submitList",
    "click .cancel-list-btn":"cancelList"
  },

  initialize: function (options) {
    this.board = options.board
    this.model = new TrelloClone.Models.List({board_id: this.board.id});
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    return this;
  },

  submitList: function (event) {
    this.model.set("title", $(event.delegateTarget).find(".list-title-text").val());
    this.model.save({}, {
      success: function () {
        this.board.lists().add(this.model);
        this.$el.empty();
        this.remove();
      }.bind(this)
    })
  },

  cancelList: function (event) {
    this.$el.empty();
    this.remove();
    this.board.fetch();
  }

})
