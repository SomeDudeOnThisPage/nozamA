const INDEX_ITEM_COUNT = 5;

document.addEventListener("ondataloaded", function(e)
{
  document.getElementById('item-list').populate(INDEX_ITEM_COUNT);
});