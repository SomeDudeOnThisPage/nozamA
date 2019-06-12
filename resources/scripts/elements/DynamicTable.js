/**
 * Custom Table element for details.
 * This class is a mess. Look away.
 */
export default class DynamicTable extends HTMLElement
{
  /**
   * Adds a row to our table.
   * Only one row at a time!
   * @param HTMLData Array of string formatted HTML table column data.
   */
  addRow(HTMLData)
  {
    let row = $('<tr></tr>');

    HTMLData.forEach(function(data)
    {
      let column = $('<td></td>');

      column.html(data);
      row.append(column);
    });

    if ($(this).attr('no-delete') === undefined)
    {
      let deleteButton = $('<button></button>').text('delete').click(function()
      {
        row.remove();
      });
      row.append($('<td></td>').append(deleteButton));
    }

    $(this.table).append(row);
  }

  /**
   * Populates a nx2 table with JSON key-value data.
   * @param data The JSON data.
   * @hidden-param subArray Specifies an array in the array to be iterated (e.g. 'details')
   */
  populate(data)
  {
    for (let key in data)
    {
      this.addRow([key, data[key]], true);
    }
  }

  /**
   * I warned you. This is a mess.
   */
  toJSON()
  {
    let getValue = function(td)
    {
      let input = $(td).find('input')[0];
      if (input !== undefined && input !== null)
      {
        return input.value;
      }

      let text = $(td).text();
      if (text !== undefined || text !== '')
      {
        return $(td).text();
      }

      return false;
    };

    let data = {};
    this.table.find('tr').not('.headers').each(function()
    {
      let columns = $(this).find('td');
      let detail = getValue(columns[0]);
      let description = getValue(columns[1]);

      if (detail && description)
      {
        data[getValue(columns[0])] = getValue(columns[1]);
      }
    });

    return data;
  }

  connectedCallback()
  {
    let headers;

    // No headers -> No table :(
    try
    {
      headers = $(this).attr('headers').split(',');
    }
    catch(e)
    {
      throw new SyntaxError('<dynamic-table> element: Attribute \'headers\' not defined.');
    }

    this.table = $('<table></table>');
    $(this).append(this.table);

    let self = this;
    let headerRow = $('<tr></tr>').attr('class', 'headers');
    headers.forEach(function(header)
    {
      headerRow.append($('<th></th>').text(header));
    });
    this.table.append(headerRow);

    if ($(this).attr('no-add') === undefined)
    {
      // Create 'add row'-button
      let button = $('<button></button>').attr('type', 'button').text($(this).attr('btext'));
      button.click(function()
      {
        self.addRow(this.template || ['<input required>', '<input required>'], true);
      });
      $(this).append(button);
    }
  }

  constructor()
  {
    super();
    this.template = false;
  }
}