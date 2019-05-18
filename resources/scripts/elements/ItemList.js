export default class ItemList extends HTMLElement
{
  static generateItemPreviewFrame(id)
  {
    let frame = document.createElement('item-preview-frame');
    frame.setItem(id);
    return frame;
  }

  /**
   * Increments page by n pages and regenerates new items
   */
  forward()
  {
    if ((this.page + 1) * this.pageItems < this.items.length)
    {
      document.getElementById('end-of-search').style.display = 'none';
      this.page += 1;
      this.populatePage();
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
      this.populatePage();
    }
  }

  populatePage()
  {
    let self = this;

    // Clear items
    this.itemFrames.forEach(function(element)
    {
      self.removeChild(element);
    });
    this.itemFrames = [];

    // TODO: too
    //let ids = window.QueryManager.getRandomItemSequence(this.pageItems);


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

  generate(data)
  {
    // Always start at 0 in this case, as there are no pages.
    for (let i = 0; i < this.pageItems; i++)
    {
      this.itemFrames[i] = ItemList.generateItemPreviewFrame(data[i]);
      this.appendChild(this.itemFrames[i]);
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
    this.items = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]; // test data
    this.page = 0;
    this.pageItems = 5;

    // Check if we already appended a stylesheet to the current DOM
    if (!document.head.contains(document.getElementById('item-list-stylesheet')))
    {
      // Append our stylesheet
      window.addStylesheet('css/elements/item-list.css');
    }
  }
}