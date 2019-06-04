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

function createDetailTableRow(key, data, form)
{
  let row = $('<tr></tr>');
  let k = $('<td></td>').append($('<input>').val(key).attr('disabled', arguments[3] || undefined));
  let v = $('<td></td>').append($('<input>').val(data).attr('disabled', arguments[3] || undefined));
  row.append(k, v);

  let button = $('<button></button>').text('Delete').attr('disabled', arguments[3] || undefined)
  .click(function()
  {
    if (!form[0].getStatus())
    {
      $(this).parent().parent().remove();
    }
  });

  row.append($('<td></td>').append(button));

  form.find('table').append(row);
}

document.addEventListener("ondataloaded", function(e)
{
  current = new URL(window.location.href).searchParams.get('item');

  // Setup forms
  $('#item-data-form')[0].setCallback(function() {});
  $('#item-details-form')[0].setCallback(function() {});
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

    // Setup detail table rows
    let form = $('#item-details-form');
    for (let k in result['details'])
    {
      createDetailTableRow(k, result['details'][k], form, true);
    }

    // Initialize table row add button
    $('#btn-internal-001').click(function()
    {
      let form = $('#item-details-form');
      if (form[0].getStatus())
      {
        form[0].setError('You need to enable the form first.');
        return false;
      }

      createDetailTableRow('', '', form);
    });
  });
});
