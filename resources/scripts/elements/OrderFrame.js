import AsyncElement from "./AsyncElement.js";

export default class OrderFrame extends AsyncElement
{
  setOrder(id)
  {
    $(this).attr('order', id);
    window.QueryManager.get('ORDER', window.getCookie('sessionID') + '/' + id, this)
  }

  // Somehow the loader HTML takes longer to load than the like 15 line HTML of this file lmao
  preDataLoaded() {}

  generate(data)
  {
    this.wrapper.find('*').not('tr,th,table,dynamic-table,#id,div').each(function()
    {
      let element = $(this);
      //if (element.attr('id') === 'ordered_on') { data[element.attr('id')] = window.currency.rate }
      element.text(element.text().replace('%s', data[element.attr('id')]));
    });

    let tag = this.wrapper.find('#id');
    tag.text(tag.text().replace('%s', $(this).attr('order')));

    let table = $(this.wrapper).find('#item-list')[0];
    data['items'].forEach(function(item)
    {
      window.QueryManager.get('ITEM', item['item_id'], function(result)
      {
        let href = $('<a></a>').attr('href', window.root + 'item.html?item=' + item['item_id']).text(result['name']);
        let price = (window.currency.rate * result['price'] * item['amount']).toFixed(2);
        table.addRow([href, item['amount'], price + window.currency.symbol]);
      });
    });

    $(this.wrapper).find('#order_total').text('Total: ' + (data['order_total'] * window.currency.rate).toFixed(2) + window.currency.symbol);
  }

  constructor()
  {
    super(arguments[0] || 'order-frame');
  }
}