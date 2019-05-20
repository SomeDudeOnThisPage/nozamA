let current;

function generate(item, vendor)
{
  let itemImageDisplay = document.getElementById('item-images');
  itemImageDisplay.generate(item['images']);

  let v_href = window.root + '/vendor/index.html?vendor=' + item['vendor_id'];

  // Populate our elements with the required data
  document.getElementById('item-name').innerText = item['name'];
  document.getElementById('item-description').innerText = item['description'];
  document.getElementById('item-price').innerText = 'Price: ' + (item['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;
  document.getElementById('item-vendor').innerHTML = '<a href="' + v_href + '">' + vendor['name'] + '</a>';
  document.getElementById('item-manufacturer').innerText = item['manufacturer'];
}

document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  current = url.searchParams.get('item');

  // Create our item
  window.QueryManager.get('ITEM', current, function(i_result)
  {
    // Get vendor data after creating our item
    window.QueryManager.get('VENDOR', i_result['vendor_id'], function(v_result)
    {
      generate(i_result, v_result)
    });
  });

  document.getElementById("add-to-cart").addEventListener("click", function()
  {
    console.log('glig');
    window.QueryManager.grabItem(window.getCookie('sessionID'), current, document.getElementById('add-to-cart-amount').value || 1);
  });
});