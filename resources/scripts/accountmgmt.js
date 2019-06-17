document.addEventListener("ondataloaded", function(e)
{
  // Check if we even have a user...
  if (!window.user) { window.location.href = 'login.html'; }
  // Check if the user wants to logout...
  if (new URL(window.location.href).searchParams.get('logout') === 'yes') { window.logout(); }
  // Check if user has changed his password
  if (new URL(window.location.href).searchParams.get('password_changed') === 'yes') { alert('Your password has changed'); }
  // Check if we recently purchased something
  let p = new URL(window.location.href).searchParams.get('purchase');
  if (p !== undefined && p !== null)
  {
    // Get order details, always last order
    let last = Array.from(window.user['order_history']).slice(-1)[0];
    $('#recent-purchase').show();

    window.QueryManager.get('ORDER', window.getCookie('sessionID') + '/' + last, function(data_order)
    {
      console.log(data_order['items']['0']);
      // Get first item
      window.QueryManager.get('ITEM', data_order['items']['0']['item_id'], function(data_item)
      {
        let href = $('<a></a>').attr('href', '/nozamA/item.html?item=' + data_order['items']['0']['item_id']).text(data_item['name']);
        let after = '\'! <br> Take a look at your order history to see the status of your order.';

        if (data_order['items'].length > 1)
        {
          after = ' and ' + (data_order['items'].length - 1) + ' other items' + after;
        }

        $('#recent-purchase').append('Thank you for your recent purchase of \'').append(href).append(after);
      });
    });
  }

  let pData = $('#info')[0];
  let aData = $('#address')[0];

  pData.populate(window.user);
  aData.populate(window.user);

  pData.setCallback(function() {
    window.QueryManager.post('CHANGE_USER', window.getCookie('sessionID'), {
      'name': $('#name').val(),
      'leave_vendor': false
    });
  });

  aData.setCallback(function() {
    window.QueryManager.post('CHANGE_ADDRESS', window.getCookie('sessionID'), {
      'city': $('#city').val(),
      'zip': $('#zip').val(),
      'street': $('#street').val()
    });
  });

  // Populate list
  $('#order-history')[0].populate();
});