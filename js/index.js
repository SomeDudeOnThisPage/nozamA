const INDEX_ITEM_COUNT = 5;

window.onload = function()
{
  let il_shadowHost = document.getElementById('item-list-shadow-host');
  let index_item_list = document.createElement('item-list');
  index_item_list.populateRandom(INDEX_ITEM_COUNT);
  il_shadowHost.appendChild(index_item_list);
};