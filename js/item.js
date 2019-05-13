let item;

window.onload = function()
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('item');

  item = new window.Item(id);
};