let current;

function findValueByText(select, text)
{
  // Set select option to current manufacturer
  return select.find('option').filter(function()
  {
    // Check if our current options' inner HTML (the manufacturer name) === our current items' manufacturer name
    return $(this).html() === text;
  }).val();
}

document.addEventListener("ondataloaded", function(e)
{
  current = new URL(window.location.href).searchParams.get('item');

  // Setup forms
  $('#item-data-form')[0].setCallback(function() {});
  $('#item-details-form')[0].setCallback(function()
  {
    console.log($('#item-details').find('dynamic-table')[0].toJSON());
  });
  $('#item-manufacturer-form')[0].setCallback(function() {});

  window.QueryManager.get('ITEM', current, function(result)
  {
    $('#item-data-form')[0].populate(result);

    // Setup manufacturer list
    window.QueryManager.get('MANUFACTURERS', null, function(data)
    {
      let select = $('#manufacturer');
      Array.from(data).forEach(function(manufacturer)
      {
        let option = $('<option></option>')
          .text(manufacturer['manufacturer_name'])
          .val(manufacturer['manufacturer_id']);

        select.append(option);
      });

      select.val(findValueByText(select, result['manufacturer']));
    });

    // Setup detail table rows
    let table = $('#item-details').find('dynamic-table')[0];
    for (let key in result['details'])
    {
      table.addRow([key, result['details'][key]], true);
    }
    // Don't forget to call disable() on the parent form again!
    $('#item-details-form')[0].disable();

    // Setup Manufacturer-Add button
    $('#add-manufacturer-confirm').click(function()
    {
      let m = $('#add-manufacturer').val();
      if (m === '')
      {
        $('#item-manufacturer-form')[0].setError('Name must not be empty!');
        return;
      }

      let select = $('#manufacturer');

      // Check if the entered manufacturer already exists in our list
      $('#manufacturer').find('option').each(function()
      {
        if ($(this).text().toLowerCase() === m.toLowerCase())
        {
          select.val(findValueByText(select, m));
          return false;
        }
      });

      // If not, add the manufacturer and create the option tag
      window.QueryManager.post('ADD_MANUFACTURER', m, null, function(result)
      {
        let option = $('<option></option>')
          .text(result['manufacturer_name'])
          .val(result['manufacturer_id']);

        select.append(option);
      });
    });
  });
});
