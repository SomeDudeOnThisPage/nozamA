import ItemFrame from './elements/ItemFrame.js';
import ItemList from './elements/ItemList.js';
import Item from './elements/Item.js';
import ItemImageDisplay from './elements/ItemImageDisplay.js';
import QueryManager from './shared/ajax_commons.js';
import header from './shared/header.js';
import footer from './shared/footer.js';

/*
  JS module script implemented on every page defining shared globals and custom elements of the page.
  Note that these can only be accessed when window.onload has fired.
*/

// DEFINE GLOBALS
window.currency = {
  'symbol' : '€',
  'rate' : 0.89 // Might be a good idea to get this dynamically but eeeeh...
};
window.Item = Item;
window.QueryManager = QueryManager;
window.user = false;

// MAIN FUNCTION HOOK
window.onload = function()
{
  let dispatch = function()
  {
    header();
    footer();
    document.dispatchEvent(new CustomEvent("ondataloaded"));
  };

  if (getCookie('sessionID'))
  {
    // If we have a session wait for the user data to be loaded.
    QueryManager.get('USER', getCookie('sessionID'), function(result)
    {
      window.user = result;
      dispatch();
    });
  }
  else
  {
    // If there is no user just load the page;
    dispatch();
  }
};

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

/**
 * Gets the value of a cookie.
 * @param name The name of the cookie.
 */
window.getCookie = function(name)
{
  let strings = document.cookie.split(/[=;]/);

  // Find our cookie (if applicable)
  let cookie = strings.findIndex(function(cname) { return cname === name; });
  if (cookie !== -1 && (strings[cookie + 1] != null))
  {
    return strings[cookie + 1];
  }

  // If we want to get our sessionID somewhere and it does not exist, prompt the user to login
  return false;
};

window.logout = function()
{
  document.cookie = "sessionID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = 'index.html';
};

// DEFINE GLOBAL CUSTOM ELEMENTS
customElements.define('item-preview-frame', ItemFrame);
customElements.define('item-list', ItemList);
customElements.define('item-image-display', ItemImageDisplay);