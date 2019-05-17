let item, vendor;

function generate(item, vendor)
{
  let itemImageDisplay = document.getElementById('item-images');
  itemImageDisplay.generate(item['images']);

  // Populate our elements with the required data
  document.getElementById('item-name').innerText = item['name'];
  document.getElementById('item-description').innerText = item['description'];
  document.getElementById('item-price').innerText = 'Price: ' + (item['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;
  document.getElementById('item-vendor').innerHTML = '<a href="vendor.html?vendor=' + item['vendor_id'] + '">' + vendor['name'] + '</a>';
  document.getElementById('item-manufacturer').innerText = item['manufacturer'];
}

document.addEventListener("onuserloaded", function(e)
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('item');

  // Create our item
  window.QueryManager.get('ITEM', id, function(i_result)
  {
    // Get vendor data after creating our item
    window.QueryManager.get('VENDOR', i_result['vendor_id'], function(v_result)
    {
      generate(i_result, v_result)
    });
  });
});