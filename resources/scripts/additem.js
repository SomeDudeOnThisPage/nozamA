const MAX_IMAGES = 4;

function form_submit(e)
{
  e.preventDefault();
  e.stopPropagation();

  $('#item-details')[0].toJSON();

  // Create Item
  window.QueryManager.post('ADD_ITEM', window.getCookie('sessionID'),
  {
    'name': $('#item-name').val(),
    'description': $('#item-description').val(),
    'manufacturer': 1,
    'price': $('#item-price').val(),
    'category': $('#item-category').val(),
    'tags': $('#item-tags').val().split(/[ ,]+/),
    'details': $('#item-details')[0].toJSON()
  },
  function(result)
  {
    let files = Array.from($('#item-images')[0].files);

    files.forEach(function(file)
    {
      window.QueryManager.addImage(window.getCookie('sessionID'), JSON.parse(result)['item_id'], file);
    });

    //window.location.href = window.root + 'item.html?item=' + result['item_id'];
  });

  return false;
}

document.addEventListener("ondataloaded", function()
{
  // Add categories to category selector element
  window.QueryManager.get('CATEGORIES', null, function(data)
  {
    let select = $('#item-category');

    for (let key in data)
    {
      select.append($('<option></option>').text(data[key]['category_name']).val(data[key]['category_id']));
    }
  });

  // Add manufacturers to manufacturer selector element
  window.QueryManager.get('MANUFACTURERS', null, function(data)
  {
    let select = $('#manufacturer');

    for (let key in data)
    {
      select.append($('<option></option>').text(data[key]['manufacturer_name']).val(data[key]['manufacturer_id']));
    }
  });

  // Setup hook to add manufacturers
  $('#add-manufacturer').keypress(function(e)
  {
    if (e.keyCode === 13)
    {
      window.QueryManager.post('ADD_MANUFACTURER', $('#add-manufacturer').val(), function(data)
      {
        $('#l-add-manufacturer').text('Added Manufacturer:' + data['manufacturer_name'] + '.');
        $('#manufacturer').append($('<option></option>').text(data['manufacturer_name']).val(data['manufacturer_id']));
        $('#manufacturer').val(data['manufacturer_id']);
      })
    }
  });

  $('#item-images').change(function(e)
  {
    let files = Array.from(e.target.files);
    $('#item-images-preview').empty();

    if (files.length > MAX_IMAGES)
    {
      alert('No more than 4 images allowed.');
      $('#item-images').val(null);
      return false;
    }

    files.forEach(function(file)
    {
      let img = $('<img alt="">').attr({
        src: URL.createObjectURL(file),
      });
      $('#item-images-preview').append(img);
    });
  });

  $('#item-details')[0].addRow(['<input>', '<input>']);
});