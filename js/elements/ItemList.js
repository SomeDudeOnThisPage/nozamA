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

  populatePage()
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
    for (let i = 0; i < pageItems; i++)
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
    let self = this;

    // Create a container for our buttons
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'item-list-button-container';
    buttonContainer.setAttribute('buttons', amt);
    this.appendChild(buttonContainer);

    this.buttons = [];

    // Create 'skip to page 1' button
    let sb1 = document.createElement('button');
    sb1.innerText = '<<';
    sb1.className = 'item-list-button';
    sb1.onclick = function() { self.page = 0; };
    buttonContainer.appendChild(sb1);

    // Create buttons in DOM
    for (let i = 0; i < amt; i++)
    {
      let button = document.createElement('button');
      button.className = 'item-list-button';
      button.innerText = '?';

      button.onclick = function()
      {
        console.log('I am useless!');
      };

      buttonContainer.appendChild(button);
    }

    // Create 'skip to last page' button
    let sb2 = document.createElement('button');
    sb2.innerText = '>>';
    sb2.className = 'item-list-button';
    sb2.onclick = function() { console.log('Leo please implement searching.'); };
    buttonContainer.appendChild(sb2);
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