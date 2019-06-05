import AsyncElement from "./AsyncElement.js";

// Leo fix your endpoints
const testData = {
  id: (Math.random() * 100).toFixed(0),
  order_status: 'Lost in the great abyss.',
  ordered_on: '02:33 27:02:1999',
  order_total: 77.34,
  items: [
    {
      'item_id': 1,
      'amount': 2
    },
    {
      'item_id': 51,
      'amount': 1
    }
  ]
};

export default class OrderFrame extends AsyncElement
{
  setOrder(id)
  {
    $(this).attr('order', id);
    this.postDataLoaded(testData);
    //window.QueryManager.get('ORDER', window.getCookie('sessionID') + '/' + id, this)
  }

  // Somehow the loader HTML takes longer to load than the like 15 line HTML of this file lmao
  preDataLoaded() {}

  generate(data)
  {
    this.wrapper.find('*').not('tr,th,table,dynamic-table').each(function()
    {
      let element = $(this);
      element.text(element.text().replace('%s', data[element.attr('id')]));
    });

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
  }

  constructor()
  {
    super(arguments[0] || 'order-frame');
  }
}