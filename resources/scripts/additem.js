const MAX_IMAGES = 4;

function form_submit(e)
{
  e.preventDefault();
  e.stopPropagation();

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
    console.log(JSON.parse(result));

    files.forEach(function(file)
    {
      window.QueryManager.addImage(window.getCookie('sessionID'), JSON.parse(result)['item_id'], file);
    });
  });
  
  return false;
}

document.addEventListener("ondataloaded", function()
{
  // Add categories to category selector element
  window.QueryManager.get('CATEGORIES', null, function(data)
  {
    let select = $('#item-category');

    for (let i = 1; i <= Object.keys(data).length; i++)
    {
      let option = $('<option></option>').text(data[i]).attr({
        value: i
      });
      select.append(option);
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