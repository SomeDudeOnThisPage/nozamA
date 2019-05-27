import AsyncElement from "./AsyncElement.js";

export default class ItemList extends AsyncElement
{
  static generateItemPreviewFrame(id)
  {
    if (arguments[1] === 'cart')
    {
      let frame = $('<cart-item-frame></cart-item-frame>');
      frame[0].setItem(id, arguments[2]);
      return frame;
    }
    else
    {
      let frame = $('<item-preview-frame></item-preview-frame>');
      frame[0].setItem(id);
      return frame;
    }
  }

  /**
   * Adds one specific item based on its' ID.
   * @param id The ID of the item.
   */
  addItem(id)
  {
    let frame = ItemList.generateItemPreviewFrame(id, this.getAttribute('mode') || null);
    $(this.shadowRoot).append(frame);
  }

  /**
   * Removes the item-frames (not the item ids themselves)
   */
  clear()
  {
    this.wrapper.empty();
  }

  /**
   * Increments page by n pages and regenerates new items
   */
  forward()
  {
    if ((this.page + 1) * this.pageItems < this.items.length)
    {
      $('#end-of-search').css('display', 'none');
      this.clear();
      this.page += 1;
      this.generate(this.items);
    }
  }

  /**
   * Decrements page by n pages and regenerates new items
   */
  back()
  {
    $('#end-of-search').css('display', 'none');

    if (this.page > 0)
    {
      this.page = Math.max(this.page - 1, 0);
      this.clear();
      this.generate(this.items);
    }
  }

  generate(data)
  {
    this.items = data;

    let self = this;
    // If we are a cart list, generate in a different manner
    if (this.getAttribute('mode') === 'cart')
    {
      let cart = Array.from(data);
      cart.forEach(function(element)
      {
        let frame = ItemList.generateItemPreviewFrame(element['item_id'], 'cart', element['amount']);
        self.wrapper.append(frame);
      });
    }
    else
    {
      // Generate items beginning from the current page ranging to the current page + items per page.
      for (let i = this.page * this.pageItems; i < this.page * this.pageItems + this.pageItems; i++)
      {
        if (i < this.items.length)
        {
          let frame = ItemList.generateItemPreviewFrame(this.items[i]);
          this.wrapper.append(frame);
        }
        else
        {
          $('#end-of-search').css('display', 'inline');
        }
      }
    }
  }

  /**
   * Populates the object based on a search string or cart.
   */
  populate()
  {
    switch(this.getAttribute('mode'))
    {
      case 'random':
        return window.QueryManager.get('RANDOM', arguments[0], this);
      case 'cart':
        return this.generate(window.user['cart']);
      case 'search':
        return window.QueryManager.get('SEARCH', arguments[0], this);
      default:
        throw new TypeError('<item-list> element missing mandatory attribute \'mode\' {\'search\', \'random\', \'cart\'}.');
    }
  }

  /**
   * Creates buttons that can modify the page.
   * The inner buttons do nothing yet but will eventually also be used to switch pages.
   */
  createButtons()
  {
    let self = this;

    // Create a container for our buttons
    let container = $('<div></div>').attr(
    {
      class: 'item-list-button-container'
    });

    // Create page forward / page backward buttons
    container.append(
      $('<button></button>').text('<').attr({
        class: 'item-list-button'
      })
      .click(function() { self.back() })
    );

    container.append(
      $('<button></button>').text('>').attr({
        class: 'item-list-button'
      })
      .click(function() { self.forward() } )
    );

    $(this.shadowRoot).append(container);
  }

  constructor()
  {
    super(arguments[0] || 'item-list');

    /**
     * Current page.
     * @type {number}
     */
    this.page = 0;

    /**
     * Items per page.
     * @type {number}
     */
    this.pageItems = 5;

    // Create buttons if we are a search thingy.
    if (this.getAttribute('mode') === null || this.getAttribute('mode') === 'search')
    {
      this.createButtons();
    }
  }
}