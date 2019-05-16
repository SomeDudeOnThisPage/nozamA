let item, vendor;

function grab_item(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  console.log('Heyoo!');

  return false;
}

window.onload = function()
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('item');

  // Create our item
  item = new window.Item(id).data;
  vendor =window.QueryManager.getVendorData(item['vendor_id']);

  // Populate our elements with the required data
  document.getElementById('item-name').innerText = item['name'];
  document.getElementById('item-description').innerText = item['description'];
  document.getElementById('item-price').innerText = 'Price: ' + (item['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;
  document.getElementById('item-vendor').innerHTML = '<a href="vendor.html?vendor=' + item['vendor_id'] + '">' + vendor['name'] + '</a>';
  document.getElementById('item-manufacturer').innerText = item['manufacturer'];

  // Generate more details in the details table
};