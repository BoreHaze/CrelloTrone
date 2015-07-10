TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["topLevel/boardShow"],
  tagName: "div class='board-show'",

  initialize: function (options) {
    this.board = options.board;
  },

  render: function () {
    this.$el.html(this.template({ board: this.board }));
    return this;
  }

})
