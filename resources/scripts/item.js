let current;

function generate(item, vendor)
{
  let itemImageDisplay = document.getElementById('item-images');
  itemImageDisplay.generate(item['images']);

  let v_href = window.root + '/vendor/index.html?vendor=' + item['vendor_id'];

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
    }

    // Get vendor data after creating our item
    window.QueryManager.get('VENDOR', i_result['vendor_id'], function(v_result)
    {
      generate(i_result, v_result)
    });
  });

  document.getElementById("add-to-cart").addEventListener("click", function()
  {
    window.QueryManager.grabItem(window.getCookie('sessionID'), current, document.getElementById('add-to-cart-amount').value || 1);
  });
});