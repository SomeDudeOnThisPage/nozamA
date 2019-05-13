/**
 * Loads an item from the database
 */
export default class Item
{
  jsonData(d)
  {
    this.data = d;
  }

  d_print()
  {
    console.log(this.data);
  }

  constructor(id)
  {
    let self = this;

    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA.ITEM + '/' + id,
      dataType: 'json',
      async: false, // This is VERY bad, but in order to load the objects on the page we NEED the data first...
      success: function(result)
      {
        self.jsonData(result);
      },
      error: function(xhr, status, error)
      {
        console.log('XHR error status: ' + xhr.status);
      }
    });
  }
}