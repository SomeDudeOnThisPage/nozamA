const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me/';

function populateListByVendorItems(list, items)
{
  list.clear();
  Array.from(items).forEach(function(item)
  {
    list.addItem(item);
  });
}

function resizeBanner()
{
  $('#content').css({'margin-top': $('#vendor-image')[0].height + /* Header height */ 55 + 25});
  window.cFooter();
}

document.addEventListener("ondataloaded", function(e)
{
  let vendorID = new URL(window.location.href).searchParams.get('vendor');

  window.QueryManager.get('VENDOR', vendorID, function(data)
  {
    document.title = data['name'];

    $('#vendor-name').text(data['name']);

    // JQuery already removes inappropriate tags (header, body, etc), but we need to manually
    // disallow script tags before adding the HTML (for obvious reasons).
    let dHTML = $("<div>" + data['description'] + "</div>");
    dHTML.find('script').remove();

    $('#vendor-description').html(dHTML.html());
    $('#vendor-image').attr('src', NOZAMA_IMAGE_PATH + data['image']);

    $('#vendor-image')[0].onload = function()
    {
      $(window).resize(resizeBanner);
      resizeBanner();
      populateListByVendorItems($('#item-list')[0], data['items']);
    };
  });
});