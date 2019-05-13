import ItemFrame from './elements/ItemFrame.js';
import ItemList from './elements/ItemList.js';
import Item from './elements/Item.js';
import QueryManager from './shared/ajax_commons.js';
import header from './shared/header.js';
import footer from './shared/footer.js';

/*
  JS module script implemented on every page defining shared globals and custom elements of the page.
  Note that these can only be accessed when window.onload has fired.
*/

// CREATE HEADER AND FOOTER
// Use an event listener so our main script can use window.onload without mess-ups.
document.addEventListener("DOMContentLoaded", function()
{
  header();
  footer();
});

// DEFINE GLOBALS
window.Item = Item;
window.QueryManager = QueryManager;

// DEFINE GLOBAL CUSTOM ELEMENTS
customElements.define('item-preview-frame', ItemFrame);
customElements.define('item-list', ItemList);

// DEFINE COMMON FUNCTIONS
/**
 * Adds a stylesheet for a custom element to the DOM when needed.
 */
window.addStylesheet = function(path)
{
  let stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('href', path);
  document.head.appendChild(stylesheet);
};