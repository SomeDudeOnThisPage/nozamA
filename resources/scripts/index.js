const INDEX_ITEM_COUNT = 5;

document.addEventListener("ondataloaded", function(e)
{
  // Logout if desired

  let il_shadowHost = document.getElementById('item-list-container');
  let index_item_list = document.createElement('item-list');
  index_item_list.populateRandom(INDEX_ITEM_COUNT);
  il_shadowHost.appendChild(index_item_list);
});