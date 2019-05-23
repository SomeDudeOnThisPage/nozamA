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
    let elements = this.getInternalElements();
    elements[0].href = 'item.html?item=' + this.getAttribute('item');
    elements[0].innerText = data['name'];
    elements[1].children[0].src = NOZAMA_IMAGE_PATH + data['images'][0];
    elements[2].innerText = (data['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;

    // Check if the user is the vendor of this item
    if (data['vendor_id'] === window.user['belongs_to_vendor'])
    {
      // Make hidden elements visible
      elements[3].style.display = 'block';
    }
  }

  constructor()
  {
    super('item-frame');
  }
}