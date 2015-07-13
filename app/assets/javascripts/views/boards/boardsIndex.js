TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["topLevel/boardsIndex"],


  render: function () {
    this.$el.html(this.template({ boards: this.collection }));
    return this;
  }

})
