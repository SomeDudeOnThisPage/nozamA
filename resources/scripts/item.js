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

  let index = findIndex(window.user['cart'], 'item_id', Number(current));
  if (index)
  {
    $('#total-cart').text('Total of #' + window.user['cart'][index]['amount'] + ' items in cart.');
  }
}

/**
 * Finds an index in a JSON array by value.
 * @param data The JSON array.
 * @param inKey The internal key of the value to be found in the data.
 * @param value The value to be matched.
 * @returns {string|boolean} The key of the value | false
 */
function findIndex(data, inKey, value)
{
  for (let key in data)
  {
    if (data[key][inKey] === value) { return key; }
  }
  return false;
}

document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  current = url.searchParams.get('item');

  // Create our item
  window.QueryManager.get('ITEM', current, function(i_result)
  {
    console.log(i_result);
    if (i_result['vendor_id'] === window.user['belongs_to_vendor'])
    {
      $('.vendor-info').each(function()
      {
        $(this).css('display', 'block');
      });
      $('#href-internal-001').attr({'href': './vendor/edititem.html?item=' + current});
    }

    window.QueryManager.get('VENDOR', i_result['vendor_id'], function(v_result)
    {
      generate(i_result, v_result)
    });
  });

  $('#add-to-cart').click(function()
  {
    let amount = Number($('#add-to-cart-amount').val()) || 1;
    let index = findIndex(window.user['cart'], 'item_id', Number(current)) || 0;
    let newAmount = amount;

    if (index)
    {
      newAmount += window.user['cart'][index]['amount'] || 0;
    }

    let destination = window.getCookie('sessionID') + '/' + current + '/' + newAmount;

    window.QueryManager.post('ADD_CART', destination, null, function()
    {
      $('#total-cart').text('Total of #' + newAmount + ' items in cart.');
      location.reload();
      //window.user['cart'][index]['amount'] = newAmount;
    });
  });

});