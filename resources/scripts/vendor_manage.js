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
    function ()
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
    console.log('ayy');
    return data['vendor'] === window.user['belongs_to_vendor'];
  });

  list.clear();
  list.generate(data);
}

document.addEventListener("ondataloaded", function(e)
{
  // Get vendor info.
  window.QueryManager.get('VENDOR', window.user['belongs_to_vendor'], function(data)
  {
    vendor = data;
    items = vendor['items'];

    // Populate our data.
    let elements = Array.from(document.getElementById('change-data').elements);
    elements[0].value = vendor['name'];
    elements[1].value = vendor['description'];

    // Initially populate item list.
    list = document.getElementById('item-list');
    let populateListByVendorItems = function()
    {
      Array.from(vendor['items']).forEach(function(item)
      {
        list.addItem(item);
      });
    };
    populateListByVendorItems();

    // Create button change listener.
    $('#vendor-info-edit').click(function()
    {
      vForm(elements);
    });

    // Create search bar listener (fires when 'enter' was pressed while the input field was in focus).
    $('#item-search').keypress(function(e)
    {
      if (e.which === 13)
      {
        let value = $('#item-search').val();

        if (value === '')
        {
          // Reset to display all vendor items.
          list.clear();
          populateListByVendorItems();
          return false;
        }

        window.QueryManager.get('SEARCH', value, searchVForm);
        return false;
      }
    });
  });
});