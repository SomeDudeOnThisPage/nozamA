let vendor;
let items;
let form_enabled = false;

document.addEventListener("ondataloaded", function(e)
{
  // Get vendor info
  window.QueryManager.get('VENDOR', window.user['belongs_to_vendor'], function(data)
  {
    vendor = data;
    items = vendor['items'];

    // Setup item list
    let itemList = document.createElement('item-list');

    // Populate our data
    let elements = Array.from(document.getElementById('change-data').elements);
    elements[0].value = vendor['name'];
    elements[1].value = vendor['description'];

    // Create button change listener
    $('#vendor-info-edit').click(function()
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
    });
  });
});