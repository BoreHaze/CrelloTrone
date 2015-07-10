TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "":"boardsIndex",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
    this.boardsIndex();
  },

  swapTopView: function (view) {
    if(this._currentTopView){
      this._currentTopView.remove();
    }

    this._currentTopView = view;
    this.$rootEl.html(this._currentTopView.$el)
  },

  boardsIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ boards: this.boards });
    this.swapTopView(view.render());
  }

})
