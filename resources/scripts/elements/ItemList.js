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
  appendChunk()
  {
    let start = this.chunkPointer * $(this).attr('chunk');
    if (start <= this.items.length)
    {
      this.setItems(this.items.slice(start, Math.min(start + $(this).attr('chunk'), this.items.length)));
      this.chunkPointer++;
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

    if (self.attr('chunk') !== undefined && self.attr('chunk') !== null)
    {
      // Chunked Display -> Add first chunk
      this.appendChunk();
    }
    else
    {
      // Full List Display
      this.setItems(data);
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
      case 'chunk-loaded-display':
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

    this.chunkPointer = 0;
  }
}