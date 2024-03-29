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

    $('#street').text(window.user['street']);
    $('#city-zip').text(window.user['zip'] + ' ' + window.user['city']);
    $('#full-name').text(window.user['name']);

    $('#purchase').click(function()
    {
      window.QueryManager.post('PURCHASE', window.getCookie('sessionID'), null, function(data)
      {
        window.location.href = '/nozamA/account/index.html?purchase=' + JSON.parse(data)['order_id'];
      })
    });
  }
});