export default class ItemList extends HTMLElement
{
  static generateItemPreviewFrame(id)
  {
    let frame = document.createElement('item-preview-frame');
    frame.innerHTML = id;
    frame.generate();
    return frame;
  }

  /**
   * Increments page by n pages and regenerates new items
   */
  forward()
  {

  }

  /**
   * Decrements page by n pages and regenerates new items
   */
  back()
  {

  }

  populateBySearch(str)
  {

  }

  /**
   * Populates the item list with random (!) items
   * @see https://github.com/qwertxzy/nozama-api#get-n--random-items
   */
  populateRandom(pageItems)
  {
    // Clear items
    this.items = [];

    let ids = window.QueryManager.getRandomItemSequence(pageItems);

    // Always start at 0 in this case, as there are no pages.
    for(let i = 0; i < pageItems; i++)
    {
      this.items[i] = ItemList.generateItemPreviewFrame(ids[i]);
      this.appendChild(this.items[i]);
    }
  }

  /**
   * Creates buttons that can modify the page.
   * @param amt
   */
  createButtons(amt)
  {
    // Create a container for our buttons
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'item-list-button-container';
    buttonContainer.setAttribute('buttons', amt);
    this.appendChild(buttonContainer);

    this.buttons = [];
  }

  constructor()
  {
    super();
    this.page = 0;
    this.items = [];

    // Check if we already appended a stylesheet to the current DOM
    if (!document.head.contains(document.getElementById('item-list-stylesheet')))
    {
      // Append our stylesheet
      window.addStylesheet('css/elements/item-list.css');
    }
  }
}