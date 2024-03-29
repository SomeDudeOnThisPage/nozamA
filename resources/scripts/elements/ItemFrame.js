import AsyncElement from "./AsyncElement.js";

const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me/';

/**
 * A custom HTML element to display the name, price, one image, vendor and
 * manufacturer to spark the customers interest.
 *
 * These elements should preferably be listed in an ItemList object.
 * If the logged in user is a vendor themselves and the item is sold by them,
 * the frame will have special attributes to allow the vendor to edit or delete
 * the item.
 *
 * @author Robin Buhlmann
 * @version 0.1
 */
export default class ItemFrame extends AsyncElement
{
  /**
   * Sets the item of this frame. Creates an asynchronous server request.
   * @param id The ID of the item.
   */
  setItem(id)
  {
    if (id === this.getAttribute('item')) { return; }
    this.setAttribute('item', id);
    window.QueryManager.get('ITEM', id, this)
  }

  /**
   * Asynchronous callback to generate the frame after the items data has been loaded
   * @param data The item data downloaded from the server.
   */
  generate(data)
  {
    let desc = data['description'].substring(0, 247);//width);
    if (data['description'].length > desc.length) { desc = desc + '...'; }

    let elements = Array.from(this.getInternalElements());
    let self = $(this.wrapper);

    self.find('.name').attr('href', window.root + 'item.html?item=' + $(this).attr('item')).text(data['name']);
    self.find('.image-image').attr('src', NOZAMA_IMAGE_PATH + data['images'][0]);
    self.find('.price').text((data['price'] * window.currency.rate).toFixed(2) + window.currency.symbol);
    self.find('.description').text(desc);

    // Check if the user is the vendor of this item
    if (data['vendor_id'] === window.user['belongs_to_vendor'])
    {
      let self = this;
      $(this.shadowRoot).find('#btn_internal_001').click(function()
      {
        window.location.href = window.root + 'vendor/edititem.html?item=' + self.getAttribute('item');
      });
      // Make hidden elements visible
      elements[4].style.display = 'block';
      elements[2].innerText = 'This item is being sold by your shop.'
    }

    $(this.wrapper).fadeIn(750);
    window.cFooter();
  }

  constructor()
  {
    super(arguments[0] || 'item-frame');
    $(this.wrapper).hide();
  }
}