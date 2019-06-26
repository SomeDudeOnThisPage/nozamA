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
    'manufacturer': $('#manufacturer').val(),
    'price': $('#item-price').val(),
    'category': $('#item-category').val(),
    'tags': $('#item-tags').val().split(/[ ,]+/),
    'details': $('#item-details')[0].toJSON()
  },
  function(result)
  {
    let files = Array.from($('#item-images')[0].files);
    let total = files.length;
    let added = 0;

    files.forEach(function(file)
    {
      window.QueryManager.addImage(window.getCookie('sessionID'), JSON.parse(result)['item_id'], file, function()
      {
        added++;

        // Do not continue until all images are added.
        if (added === total)
        {
          window.location.href = window.root + 'vendor/manage.html';
        }
      });
    });
  });

  return false;
}

function generateManufacturerList()
{
  let initial = arguments[0] || null;

  // Add manufacturers to manufacturer selector element
  window.QueryManager.get('MANUFACTURERS', null, function(data)
  {
    let select = $('#manufacturer');
    select.empty();

    for (let key in data)
    {
      select.append($('<option></option>').text(data[key]['manufacturer_name']).val(data[key]['manufacturer_id']));
    }

    if (initial)
    {
      select.val(initial);
    }
  });
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

  generateManufacturerList();

  // Setup hook to add manufacturers
  $('#add-manufacturer').keypress(function(e)
  {
    if (e.keyCode === 13)
    {
      window.QueryManager.post('ADD_MANUFACTURER', null,
      {
        'manufacturer_name': $('#add-manufacturer').val(),
        'manufacturer_description': ''
      },
      function(data)
      {
        data = JSON.parse(data);
        generateManufacturerList(data['manufacturer_id']);
      });
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