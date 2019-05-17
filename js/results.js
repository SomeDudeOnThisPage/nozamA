const PAGE_ITEMS = 3;

window.onload = function()
{
  let url = new URL(window.location.href);
  let search = (url.searchParams.get('search')).replace(/'+'/g,' '); // Reverse our replacement of ' ' by '+' because the DB wants space separation

  let il_shadowHost = document.getElementById('item-list-shadow-host');
  let itemList = document.createElement('item-list');

  // Perform the actual search
  // Ha ha jk this isn't implemented yet so let's do this.

  let pages = /* Total amount of search results divided by PAGE_ITEMS rounded down, but just PAGE_ITEMS for now... */ PAGE_ITEMS;

  itemList.createButtons(3);
  itemList.populatePage();
  il_shadowHost.appendChild(itemList);
};