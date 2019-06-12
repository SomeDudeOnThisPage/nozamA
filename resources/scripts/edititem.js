let current;

document.addEventListener("ondataloaded", function(e)
{
  current = new URL(window.location.href).searchParams.get('item');

  // Setup form callbacks (These three use the same callback as their data is shared. Separation is purely visual.)
  $('#item-data-form')[0].setCallback(changeItemData);
  $('#item-manufacturer-form')[0].setCallback(changeItemData);
  $('#item-category-form')[0].setCallback(changeItemData);
  $('#item-details-form')[0].setCallback(function()
  {
    let details = $('#item-details').find('dynamic-table')[0].toJSON();
    window.QueryManager.post('CHANGE_ITEM', 'details/' + window.getCookie('sessionID') + '/' + current, details, function() {})
  });

  // Get item data
  window.QueryManager.get('ITEM', current, function(result)
  {
    $('#item-data-form')[0].populate(result);

    // Setup select boxes
    window.QueryManager.get('MANUFACTURERS', null, function(data) { populateSelect('manufacturer', data, result['manufacturer']); });
    //$('#category').append($('<option></option>').val('Test').text('Hello'));
    window.QueryManager.get('CATEGORIES', null, function(data) { populateSelect('category', data, result['category']); });

    // Setup detail table rows
    let table = $('#item-details').find('dynamic-table')[0];
    table.populate(result['details']);
    $('#item-details-form')[0].disable();

    // Setup Manufacturer-Add button
    $('#add-manufacturer').keypress(function(e)
    {
      if (e.keyCode === 13)
      {
        let manufacturer = $('#add-manufacturer').val();
        if (manufacturer === '')
        {
          $('#item-manufacturer-form')[0].setError('Name must not be empty!');
          return;
        }

        // Check if the entered manufacturer already exists in our list
        let select = $('#manufacturer');
        $('#manufacturer').find('option').each(function ()
        {
          if ($(this).text().toLowerCase() === manufacturer.toLowerCase())
          {
            select.val(findValueByText(select, manufacturer));
            return false;
          }
        });

        // If not, add the manufacturer and create the option tag
        window.QueryManager.post('ADD_MANUFACTURER', manufacturer, null, function (result)
        {
          let option = $('<option></option>')
            .text(result['manufacturer_name'])
            .val(result['manufacturer_id']);

          select.append(option);
        });
      }
    });
  });
});

/**
 * Shared callback between the toggle forms (except the item details form.).
 */
function changeItemData()
{
  let data = $('#item-data-form')[0].toJSON();
  let manufacturer = $('#item-manufacturer-form')[0].toJSON();
  let category = $('#item-category-form')[0].toJSON();
  if (category['category'] === null) { category['category'] = 1; }

  // There goes our IE11 support
  let json = Object.assign(data, manufacturer, category);

  console.log(json);

  window.QueryManager.post('CHANGE_ITEM', 'info/' + window.getCookie('sessionID') + '/' + current, json, function() {})
}

/**
 * Finds an option field by its' value.
 * @param select The parent select element.
 * @param text The text to find.
 * @returns {*|jQuery|string|undefined}
 */
function findValueByText(select, text)
{
  // Set select option to current manufacturer
  return select.find('option').filter(function()
  {
    // Check if our current options' inner HTML (the manufacturer name) === our current items' manufacturer name
    return $(this).html() === text;
  }).val();
}

/**
 * Convenience function to populate a select field with given data.
 * @param element The select field.
 * @param data The data.
 * @param initial Initially selected option field by its' text.
 */
function populateSelect(element, data, initial)
{
  let select = $('#' + element);
  data.forEach(function(object)
  {
    let option = $('<option></option>')
      .text(object[element + '_name'])
      .val(object[element + '_id']);

    select.append(option);
  });

  select.val(findValueByText(select, initial));
}
