TrelloClone.Helpers.initializeListSorting = function () {
  $(".list-sortable").sortable({
    items: "> li.list-show"
  })
};


TrelloClone.Helpers.initializeCardSorting = function () {
  $(".cards-droppable").sortable({
    connectWith: ".cards-droppable",
    items: "> li.card-show"
  })
};

TrelloClone.Helpers.registerSorting = function () {
  TrelloClone.Helpers.initializeListSorting();
  TrelloClone.Helpers.initializeCardSorting();
}

// TrelloClone.Helpers.reRegisterSorting
