TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["topLevel/boardsIndex"],

  initialize: function (options) {
    this.boards = options.boards;
  },

  render: function () {
    this.$el.html(this.template({ boards: this.boards }));
    return this;
  }

})
