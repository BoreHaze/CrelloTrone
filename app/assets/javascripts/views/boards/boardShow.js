TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["topLevel/boardShow"],
  tagName: "div class='board-show'",
  listsSelector: ".list-container",

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.board, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ board: this.board }));
    var lists = this.board.lists();
    if (lists){
      lists.forEach( function (list) {
        var listShow = new TrelloClone.Views.ListShow({ list: list });
        this.addSubview(this.listsSelector, listShow);
      }.bind(this))
    }
    return this;
  }

})
