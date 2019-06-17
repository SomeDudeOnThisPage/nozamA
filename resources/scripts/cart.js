document.addEventListener("ondataloaded", function(e)
{
  if (window.user['cart'].length === 0)
  {
    $('#cart-content, #sidebar-right').hide();
    $('#empty').fadeIn(150);
  }
  else
  {
    $('#cart-content, #sidebar-right').show();
    $('item-list')[0].populate();

    $('#purchase').click(function()
    {
      window.QueryManager.post('PURCHASE', window.getCookie('sessionID'), function()
      {
        console.log('PURCHASED!');
      })
    });
  }
});