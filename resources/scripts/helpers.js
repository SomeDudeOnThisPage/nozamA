import ItemFrame from './elements/ItemFrame.js';
import CartItemFrame from './elements/CartItemFrame.js';
import ItemList from './elements/ItemList.js';
import ItemImageDisplay from './elements/ItemImageDisplay.js';
import ToggleForm from './elements/ToggleForm.js';
import QueryManager from './shared/ajax_commons.js';
import header from './shared/header.js';
import footer from './shared/footer.js';
import DynamicTable from "./elements/DynamicTable.js";
import OrderFrame from "./elements/OrderFrame.js";

/*
  JS module script implemented on every page defining shared globals and custom elements of the page.
  Note that these can only be accessed when window.onload has fired.
  -> Actually it seems that these can be accessed already when onDOMContentLoaded has fired but better be safe than sorry.
*/

// DEFINE GLOBALS
window.root = window.location.origin + '/';
window.resources = window.root + '/resources/';
window.currency = {
  'symbol' : '€',
  'rate' : 0.89 // Might be a good idea to get this dynamically but eeeeh...
};
window.QueryManager = QueryManager;
window.user = false;

// MAIN FUNCTION HOOK
window.onload = function()
{
  $(window).resize(function() { cFooter(); });

  let dispatch = function()
  {
    header();
    footer();
    document.dispatchEvent(new CustomEvent("ondataloaded"));
  };

  if (getCookie('sessionID'))
  {
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
window.addStylesheet = function()
{
  let path = arguments[0];
  let element = arguments[1] || 'head';

  let stylesheet = $('<link>').attr({
    rel: 'stylesheet',
    href: window.resources + 'css/' + path
  });
  $(element).append(stylesheet);
};

/**
 * Checks if the footer position needs to be adjusted.
 * Should be called from any element generator that can
 * change the height of the page.
 */
window.cFooter = function()
{
  let footer = $('.footer');
  if ($('#main-container').height() > $(window).height())
  {
    footer.css('position', 'static');
  }
  else
  {
    footer.css('position', 'absolute');
  }
};

/**
 * Convenience function to set the #error-message paragraph text.
 * @param msg The message.
 */
window.error = function(msg)
{
  $('#error-message').text(arguments[1] || '' + msg);
};

/**
 * Called on remove of cart item frames.
 * Only on /account/cart.html
 */
window.checkCart = function()
{
  if ($('item-list').children().length === 0)
  {
    $('#cart-content, #sidebar-right').hide();
    $('#empty').fadeIn(150);
  }
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

/**
 * Prepares logout procedure.
 * Logout itself is handled on the account pages' script.
 */
window.logout = function()
{
  document.cookie = "sessionID=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = window.root + 'index.html';
};

try
{
  // DEFINE GLOBAL CUSTOM ELEMENTS
  customElements.define('item-preview-frame', ItemFrame);
  customElements.define('cart-item-frame', CartItemFrame);
  customElements.define('item-list', ItemList);
  customElements.define('item-image-display', ItemImageDisplay);
  customElements.define('toggle-form', ToggleForm);
  customElements.define('dynamic-table', DynamicTable);
  customElements.define('order-frame', OrderFrame);
}
catch(ignored)
{
  // We are using a browser that does not support CustomElements.v1
  // -> Probably IE or Edge.
  console.log('Why InternetExplorer, GRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR!');
  $('body').empty();

  window.addStylesheet('edge-support.css');

  let stupid = $('<div></div>')
    .html('<p>Look at this dude using Edge.<br>Seriously, use a good browser.</p>')
    .attr('class', 'rotating');
  $('body').append(stupid);
}
