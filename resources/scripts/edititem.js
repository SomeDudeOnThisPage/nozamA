let current;

document.addEventListener("ondataloaded", function()
{
  current = new URL(window.location.href).searchParams.get('item');

  // Setup form callbacks (These three use the same callback as their data is shared. Separation is purely visual.)
  $('#item-data-form')[0].setCallback(changeItemData);
  $('#item-manufacturer-form')[0].setCallback(changeItemData);
  $('#item-category-form')[0].setCallback(changeItemData);
  $('#item-details-form')[0].setCallback(function()
  {
    let details = $('#item-details')[0].toJSON();
    window.QueryManager.post('CHANGE_ITEM', 'details/' + window.getCookie('sessionID') + '/' + current, details, function() {})
  });

  // Get item data
  window.QueryManager.get('ITEM', current, function(result)
  {
    window.document.title = 'Edit: ' + result['name'];

    $('#item-data-form')[0].populate(result);

    // Setup select boxes
    window.QueryManager.get('MANUFACTURERS', null, function(data) { populateSelect('manufacturer', data, result['manufacturer']); });
    //$('#category').append($('<option></option>').val('Test').text('Hello'));
    window.QueryManager.get('CATEGORIES', null, function(data) { populateSelect('category', data, result['category']); });

    // Setup detail table rows
    let table = $('#item-details')[0];
    table.populate(result['details']);
    $('#item-details-form')[0].disable();

    // Setup Manufacturer-Add button
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
            let data2 = JSON.parse(data);
            window.QueryManager.get('MANUFACTURERS', null, function(data) { populateSelect('manufacturer', data, data2['manufacturer_id']); });
          });
      }
    });

    // Delete
    $('#delet-this').click(function()
    {
      window.QueryManager.post('REMOVE_ITEM', window.getCookie('sessionID') + '/' + current, null, function(data)
      {
        window.location.href = window.root + 'vendor/manage.html';
      });
    });

    window.cFooter();

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

  if (typeof initial !== 'number') { initial = findValueByText(select, initial); }
  select.val(initial);
}