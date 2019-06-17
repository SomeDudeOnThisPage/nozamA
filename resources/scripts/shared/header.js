const VENDOR_SPECIFIC = 1;
const options_on = [];
  options_on[0] = {value : 'account/index.html#account-info', innerText : 'Account Information'};
  options_on[1] = {value : 'account/index.html#account-history', innerText : 'Payment History'};
  options_on[2] = {value : 'account/cart.html', innerText : 'Shopping Cart'};
  options_on[3] = {value : 'account/index.html?logout=yes', innerText : 'Log Out'};
  options_on[4] = {value : 'vendor/manage.html', innerText : 'Vendor Management'};

/**
 * Creates the nozamA header.
 */
export default function()
{
  window.addStylesheet('header.css');

  let container = $('#main-container');
  let header = $('<div></div>').attr({class: 'header'}).load('/nozamA/resources/html/elements/header.html', function()
  {
    // Check if we have a valid session and set the headers' links accordingly
    if (window.user)
    {
      $('#nav-on').css('display', 'block');

      if (!window.user['belongs_to_vendor'])
      {
        $('#vlink').css('display', 'none');
      }
    }
    else
    {
      $('#nav-off').css('display', 'block');
    }

    // Attach search bar event handlers
    $('#header_search').submit(function()
    {
      let element = $(this).find('#nav-searchbar');

      let search = (element.val()).replace(/ /g,'+');
      if (search === '') { return false; }

      window.location.href = window.root + 'results.html?search=' + search;
    });

  });

  container.prepend(header);
};