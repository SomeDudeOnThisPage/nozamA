document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let search = (url.searchParams.get('search')).replace(/'+'/g,' ');
  $('#item-list')[0].populate(search);
});