import Item from "./Item";

/**
 * This class represents an <item-image-viewer> custom HTML element.
 */
export default class ItemImageViewer extends HTMLElement
{

  constructor()
  {
    super();

    this.item = new Item(this.innerText);

    // Check if we already appended a stylesheet to the current DOM
    if (!document.head.contains(document.getElementById('item-list-stylesheet')))
    {
      // Append our stylesheet
      window.addStylesheet('css/elements/item-list.css');
    }
  }
}