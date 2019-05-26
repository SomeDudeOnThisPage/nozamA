document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let search = (url.searchParams.get('search')).replace(/'+'/g,' ');

  let itemList = document.getElementById('item-list');

  // Perform the actual search
  itemList.createButtons(3);
  itemList.populate(search);
});