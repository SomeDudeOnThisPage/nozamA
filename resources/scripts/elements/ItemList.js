export default class ItemList extends HTMLElement
{
  static generateItemPreviewFrame(id)
  {
    let frame = document.createElement('item-preview-frame');
    frame.setItem(id);
    return frame;
  }

  /**
   * Removes the item-frames (not the item ids themselves)
   */
  clear()
  {
    let self = this;

    this.itemFrames.forEach(function(element)
    {
      self.removeChild(element);
    });

    this.itemFrames = [];
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

  populatePage(search)
  {
    this.itemFrames = [];

    window.QueryManager.get('SEARCH', search, this);
  }

  generate(data)
  {
    this.items = data;

    for (let i = this.page * this.pageItems; i < this.page * this.pageItems + this.pageItems; i++)
    {
      if (i < this.items.length)
      {
        this.itemFrames[i] = ItemList.generateItemPreviewFrame(this.items[i]);
        this.appendChild(this.itemFrames[i]);
      }
      else
      {
        document.getElementById('end-of-search').style.display = 'inline';
      }
    }
  }

  /**
   * Populates the item list with random (!) items
   * @see https://github.com/qwertxzy/nozama-api#get-n--random-items
   */
  populateRandom()
  {
    // Clear items
    this.itemFrames = [];
    window.QueryManager.get('RANDOM', this.pageItems, this);
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
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'item-list-button-container';
    buttonContainer.setAttribute('buttons', amt);
    this.appendChild(buttonContainer);

    this.buttons = [];

    // Create 'skip to page 1' button
    let sb1 = document.createElement('button');
    sb1.innerText = '<<';
    sb1.className = 'item-list-button';
    sb1.onclick = function() { self.back(); };
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
    sb2.onclick = function() { self.forward(); };
    buttonContainer.appendChild(sb2);
  }

  constructor()
  {
    super();
    this.itemFrames = [];
    this.page = 0;
    this.pageItems = 5;

    // Append our stylesheet
    window.addStylesheet('elements/item-list.css');
  }
}