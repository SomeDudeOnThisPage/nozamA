import AsyncElement from "./AsyncElement.js";

const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me/';

/**
 * A custom HTML element to display the name, price, one image, vendor and
 * manufacturer to spark the customers interest.
 */
export default class ItemFrame extends AsyncElement
{
  /**
   * Sets the item of this frame. Creates an asynchronous server request.
   * @param id
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
  }

  constructor()
  {
    super('item-frame');
  }
}