let current;

function generate(item, vendor)
{
  let v_href = window.root + '/vendor/index.html?vendor=' + item['vendor_id'];

  $('#item-images')[0].generate(item['images']);

  // Populate our elements with the required data
  $('#item-name').text(item['name']);
  $('#item-description').text(item['description']);
  $('#item-price').text('Price: ' + (item['price'] * window.currency.rate).toFixed(2) + window.currency.symbol);
  $('#item-vendor').html('<a href="' + v_href + '">' + vendor['name'] + '</a>');
  $('#item-manufacturer').text(item['manufacturer']);
}

document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  current = url.searchParams.get('item');

  // Create our item
  window.QueryManager.get('ITEM', current, function(i_result)
  {
    // Check if the user is the vendor of this item
    if (i_result['vendor_id'] === window.user['belongs_to_vendor'])
    {
      // Make hidden elements visible
      Array.from(document.getElementsByClassName('vendor-info')).forEach(function(element)
      {
        element.style.display = 'block';
      });

      // Make link functional
      $('#href-internal-001').attr({'href': './vendor/edititem.html?item=' + current});
    }

    // Get vendor data after creating our item
    window.QueryManager.get('VENDOR', i_result['vendor_id'], function(v_result)
    {
      generate(i_result, v_result)
    });
  });

  $('#add-to-cart').click(function()
  {
    let cart = Array.from(window.user['cart']);

    // Check if the item is already in the cart
    for(let i = 0; i < cart.length; i++)
    {
      if(cart[i]['item_id'] === Number(current))
      {
        let amount = JSON.parse(cart[i]['amount']);
        let add = Number($('#add-to-cart-amount').val()) || 1;
        let new_amount = amount + add;

        window.QueryManager.grabItem(window.getCookie('sessionID'), current, new_amount);
        cart[i]['amount'] = new_amount;
        return;
      }
    }

    window.QueryManager.grabItem(window.getCookie('sessionID'), current, Number($('#add-to-cart-amount').val()) || 1);
  });

});