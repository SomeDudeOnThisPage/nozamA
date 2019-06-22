document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let search = (url.searchParams.get('search')).replace(/'+'/g,' ');
  $('#item-list')[0].populate(search);

  let lastHeight = 0;

  $(window).scroll(function()
  {
    if($(window).scrollTop() + $(window).height() > $(document).height() - $(window).height() / 10)
    {
      // Prevent loading all chunks at once because they need some time to appear...
      if (lastHeight < $(document).height())
      {
        $('#item-list')[0].appendChunk();
        lastHeight = $(document).height();
      }
    }
  });
});