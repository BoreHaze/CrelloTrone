TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["topLevel/boardShow"],
  tagName: "div class='board-show'",
  listsSelector: ".list-container",
  listFormSelector: ".list-form-container",

  events: {
    "click .add-list-btn":"addList"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync add", this.render);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    var lists = this.model.lists();
    if (lists){
      lists.forEach( function (list) {
        var listShow = new TrelloClone.Views.ListShow({ model: list });
        this.addSubview(this.listsSelector, listShow);
      }.bind(this))
    }

    // TrelloClone.Helpers.registerSorting();
    return this;
  },

  addList: function (event) {
    event.preventDefault();
    var listForm = new TrelloClone.Views.ListForm({ board: this.model });
    $(event.delegateTarget).find(this.listFormSelector).empty();
    this.addSubview(this.listFormSelector, listForm);
  },

  initializeListSorting: function () {
    $(".list-sortable").sortable({
      items: "> li.list-show"
    })
  },


  initializeCardSorting: function () {
    $(".cards-droppable").sortable({
      connectWith: ".cards-droppable",
      items: "> li.card-show"
    })
  }

})
