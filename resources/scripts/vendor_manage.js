let vendor;
let items;
let form_enabled = false;
let list;

function vForm(elements)
{
  if ((form_enabled = !form_enabled) === true) // Was false, enable form elements
  {
    elements.forEach(function(element)
    {
      element.removeAttribute('disabled');
    });

    $('#vendor-info-edit').text('Confirm');
  }
  else // Was true, confirm, send data and disable forms
  {
    $('#vendor-info-edit').text('Please Wait');

    window.QueryManager.post('EDIT_VENDOR', window.getCookie('sessionID'),
    {
      'name': elements[0].value,
      'description': elements[1].value
    },
    function()
    {
      elements.forEach(function (element)
      {
        element.setAttribute('disabled', null);
      });
      $('#vendor-info-edit').text('Edit Information');
    });
  }
}

function searchVForm(data)
{
  data.filter(function(value, index, arr)
  {
    return data['vendor'] === window.user['belongs_to_vendor'];
  });

  list.clear();
  list.generate(data);
}

function populateListByVendorItems(list)
{
  list.clear();
  Array.from(vendor['items']).forEach(function(item)
  {
    list.addItem(item);
  });
}

document.addEventListener("ondataloaded", function(e)
{
  // Get vendor info.
  window.QueryManager.get('VENDOR', window.user['belongs_to_vendor'], function(data)
  {
    vendor = data;
    items = vendor['items'];

    let dataForm = $('#change-data')[0];
    dataForm.populate(data);
    dataForm.setCallback(function()
    {
      window.QueryManager.post('EDIT_VENDOR', window.getCookie('sessionID'),
      {
        'name': $('#name').val(),
        'description': $('#description').val()
      });
    });

    // Initially populate item list.
    populateListByVendorItems($('#item-list')[0]);

    // Create search bar listener (fires when 'enter' was pressed while the input field was in focus).
    $('#item-search').keypress(function(e)
    {
      if (e.which === 13)
      {
        let value = $('#item-search').val();

        if (value === '')
        {
          // Reset to display all vendor items.
          populateListByVendorItems($('#item-list')[0]);
          return false;
        }

        window.QueryManager.get('SEARCH', value, searchVForm);
        return false;
      }
    });
  });
});