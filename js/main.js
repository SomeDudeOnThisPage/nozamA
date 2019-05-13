import ItemFrame from './elements/ItemFrame.js';
import Item from './elements/Item.js'

/*
  Main JS script implemented on every page defining the globals of the page.
  Note that these can only be accessed when window.onload has fired
*/

// DEFINE GLOBALS
window.Item = Item;

// DEFINE GLOBAL CUSTOM ELEMENTS
customElements.define('item-preview-frame', ItemFrame);