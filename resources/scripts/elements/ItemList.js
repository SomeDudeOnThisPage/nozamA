import AsyncElement from "./AsyncElement.js";

export default class ItemList extends AsyncElement
{
  static generateItemPreviewFrame(id)
  {
    if (arguments[1] === 'cart')
    {
      let frame = document.createElement('cart-item-frame');
      frame.setItem(id, 2);
      return frame;
    }
    else
    {
      let frame = document.createElement('item-preview-frame');
      frame.setItem(id);
      return frame;
    }
  }

  /**
   * Adds one specific item based on its' ID.
   * @param id The ID of the item.
   */
  addItem(id)
  {
    this.itemFrames.push(ItemList.generateItemPreviewFrame(id, this.getAttribute('mode') || null));
    this.shadowRoot.appendChild(this.itemFrames[this.itemFrames.length - 1]);
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
      document.getElementById('end-of-search').style.display = 'none';
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
    document.getElementById('end-of-search').style.display = 'none';

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

    // If we are a cart list, generate in a different manner
    if (this.getAttribute('mode') === 'cart')
    {
      let cart = Array.from(data);
      cart.forEach(function(element)
      {
        let frame = ItemList.generateItemPreviewFrame(element['item_id'], 'cart');
        this.itemFrames.push(frame);
        this.wrapper.append(frame);
      });
    }
    else
    {
      for (let i = this.page * this.pageItems; i < this.page * this.pageItems + this.pageItems; i++)
      {
        if (i < this.items.length)
        {
          this.itemFrames.push(ItemList.generateItemPreviewFrame(this.items[i]));
          this.wrapper.append(this.itemFrames[i]);
        }
        else
        {
          // Just in case our page has no 'end-of-search'
          if (document.getElementById('end-of-search') !== null)
          {
            document.getElementById('end-of-search').style.display = 'inline';
          }
        }
      }
    }
  }

  /**
   * Populates the object based on a search string or cart.
   */
  populate()
  {
    this.itemFrames = [];

    switch(this.getAttribute('mode'))
    {
      case 'random':
        return window.QueryManager.get('RANDOM', arguments[0], this);
      case 'cart':
        return generate(window.user['cart']);
      default:
        return window.QueryManager.get('SEARCH', arguments[0], this);
    }
  }

  /**
   * Creates buttons that can modify the page.
   * The inner buttons do nothing yet but will eventually also be used to switch pages.
   * @param amt
   */
  createButtons(amt)
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
    this.itemFrames = [];
    this.page = 0;
    this.pageItems = 5;
  }
}