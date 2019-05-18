/**
 * A custom HTML element to display the name, price, one image, vendor and
 * manufacturer to spark the customers interest.
 */
export default class ItemFrame extends HTMLElement
{
  /**
   * Sets the item of this frame. Creates an asynchronous server request.
   * @param id
   */
  setItem(id)
  {
    if (id === this.getAttribute('item')) { return; }
    this.setAttribute('item', id);

    // Reset inner HTML and make the loader visible
    this.shadowRoot.innerHTML = `
      <div class="item-frame">
        <link rel="stylesheet" href="./resources/css/elements/item-frame.css">
        <div class="loader"></div>
      </div>`;

    // Fetch item data from the server
    window.QueryManager.get('ITEM', id, this)
  }

  /**
   * Asynchronous callback to generate the frame after the items data has been loaded
   * @param data The item data downloaded from the server.
   */
  generate(data)
  {
    let href = 'item.html?item=' + this.getAttribute('item');
    let price = (data['price'] * window.currency.rate).toFixed(2) + window.currency.symbol;

    this.shadowRoot.innerHTML = `
      <div class="item-frame">
        <link rel="stylesheet" href="./resources/css/elements/item-frame.css">
        <a href="` + href + `" class="item-frame-name">` + data['name'] + `</a>
        <a href ="` + href + `" class="item-frame-image"><img src="resources/img/img_missing.png" alt=""></a>
        <p>` + price + `</p>
      </div>`;
  }

  constructor()
  {
    super();

    // Create class attributes
    this.attachShadow({mode: 'open'});
  }
}