import AsyncElement from "./AsyncElement.js";

/**
 * All elements considered ItemFrames to be removed on a 'clear()'-call.
 * @type {string}
 */
const subElements = 'item-preview-frame,cart-item-frame,order-frame';

export default class ItemList extends AsyncElement
{
  static generateItemPreviewFrame(id)
  {
    let frame;
    if (arguments[1] === 'cart')
    {
      frame = $('<cart-item-frame></cart-item-frame>');
      frame[0].setItem(id, arguments[2]);
    }
    else if (arguments[1] === 'order')
    {
      frame = $('<order-frame></order-frame>');
      frame[0].setOrder(id);
    }
    else
    {
      frame = $('<item-preview-frame></item-preview-frame>');
      frame[0].setItem(id);
    }
    return frame;
  }

  /**
   * Adds one specific item based on its' ID.
   * @param id The ID of the item.
   */
  addItem(id)
  {
    let frame = ItemList.generateItemPreviewFrame(id, this.getAttribute('mode') || null);
    $(this.wrapper).append(frame);
  }

  /**
   * Removes the item-frames (not the item ids themselves).
   */
  clear()
  {
    $(this.wrapper).find().each(function()
    {
      $(this).remove(subElements);
    });
  }

  /**
   * Increments page by n pages and regenerates new items.
   * @param n Amount of pages.
   */
  forward(n)
  {
    if ((this.page + 1) * $(this).attr('page') < this.items.length)
    {
      $('#end-of-search').css('display', 'none');
      this.clear();
      this.page += arguments[0] || 1;
      this.generate(this.items);
    }
  }

  /**
   * Decrements page by n pages and regenerates new items
   * @param n Amount of pages.
   */
  back(n)
  {
    $('#end-of-search').css('display', 'none');

    if (this.page - (n || 1) >= 0)
    {
      this.page = Math.max(this.page - (n || 1), 0);
      this.clear();
      this.generate(this.items);
    }
  }

  /**
   * Generates a set amount of frames.
   * @param frames The JSON-Data of the frames.
   */
  setItems(frames)
  {
    let self = $(this);
    frames.forEach(function(data)
    {
      // FFS why can't our API just be consistent?
      // Just ALWAYS give me ItemList JSON data in the same format, not different if you get cart or order-history data.
      // Now I have to do: 'data['item_id'] || data' to get an item ID in both cases...
      let frame = ItemList.generateItemPreviewFrame(data['item_id'] || data, self.attr('mode'));
      self[0].wrapper.append(frame);
    });
  }

  generate(data)
  {
    let self = $(this);
    this.items = data;
    this.totalPages = Math.ceil(data.length / $(this).attr('page'));

    if (self.attr('page') !== undefined && self.attr('page') !== null)
    {
      // Paged Display
      let start = self[0].page * self.attr('page');
      self[0].setItems(self[0].items.slice(start, start + self.attr('page')));
    }
    else
    {
      // Full List Display
      self[0].setItems(data);
    }

    console.log(this.wrapper.find('.button-container'));
    // Display buttons if necessary
    let a = $(this).attr('page');
    if (a !== null && a !== undefined && data.length > a)
    {
      this.wrapper.find('.button-container').css('display', 'block');
    }
  }

  preDataLoaded() {}

  /**
   * Populates the object based on a search string or cart.
   */
  populate()
  {
    switch($(this).attr('mode'))
    {
      case 'random':
        return window.QueryManager.get('RANDOM', arguments[0], this);
      case 'cart':
        return this.generate(window.user['cart']);
      case 'search':
        return window.QueryManager.get('SEARCH', arguments[0], this);
      case 'order':
        return this.postDataLoaded(window.user['order_history']);
      default:
        throw new TypeError('<item-list> element missing mandatory attribute \'mode\' {\'search\', \'random\', \'cart\', \'order\'}.');
    }
  }

  constructor()
  {
    super(arguments[0] || 'item-list');

    this.page = 0;
  }
}