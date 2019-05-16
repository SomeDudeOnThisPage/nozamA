let item, vendor;

window.onload = function()
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('item');

  // Create our item
  item = new window.Item(id).data;
  vendor = window.QueryManager.getVendorData(item['vendor_id']);

  let iidisplay = document.getElementById('item-images');
  iidisplay.generate(['resources/img/img_missing.png', 'resources/img/img_missing.png']);

  // TODO: Unfuck this
  // Populate our elements with the required data
  document.getElementById('item-name').innerText = item['name'];
  document.getElementById('item-description').innerText = item['description'];
  document.getElementById('item-price').innerText = 'Price: ' + (item['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;
  document.getElementById('item-vendor').innerHTML = '<a href="vendor.html?vendor=' + item['vendor_id'] + '">' + vendor['name'] + '</a>';
  document.getElementById('item-manufacturer').innerText = item['manufacturer'];
};