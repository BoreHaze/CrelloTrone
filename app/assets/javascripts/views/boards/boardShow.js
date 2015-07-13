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
    this.emptySelector(this.listsSelector);
    if (lists){
      lists.sort();
      lists.forEach( function (list) {
        var listShow = new TrelloClone.Views.ListShow({ model: list, collection: this.model.lists() });
        this.addSubview(this.listsSelector, listShow);
      }.bind(this))
    }

    return this;
  },

  addList: function (event) {
    event.preventDefault();
    var listForm = new TrelloClone.Views.ListForm({ board: this.model });
    $(event.delegateTarget).find(this.listFormSelector).empty();
    this.addSubview(this.listFormSelector, listForm);
  },

  sortIntercept: function (event) {
    console.log("In sort intercept");
    console.log(this.model.lists());
    return this.render();
  }

})
