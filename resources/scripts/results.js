document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let search = (url.searchParams.get('search')).replace(/'+'/g,' ');

  let itemList = document.createElement('item-list');

  // Perform the actual search
  // Ha ha jk this isn't implemented yet so let's do this.
  itemList.createButtons(3);
  itemList.populatePage();
  document.getElementById('item-list-container').appendChild(itemList);
});