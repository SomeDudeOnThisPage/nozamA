document.addEventListener("ondataloaded", function(e)
{
  $('item-list')[0].populate();

  $('#purchase').click(function()
  {
    window.QueryManager.post('PURCHASE', window.getCookie('sessionID'), function()
    {
      console.log('PURCHASED!');
    })
  });
});