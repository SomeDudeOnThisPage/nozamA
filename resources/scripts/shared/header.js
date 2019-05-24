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
      // Create dropdown menu containing account links
      let dropdown = $('<select></select>').attr({
        id: 'nav-select'
      });

      // Create a placeholder for the dropdown menu
      let dropdown_ph = $('<option></option>').text('Your Account').attr({
        hidden: true
      });
      dropdown.append(dropdown_ph);

      $(dropdown).change(function()
      {
        document.location.href = $(this).val();
      });

      // Generate our links
      let isvendor = VENDOR_SPECIFIC;
      if (window.user['belongs_to_vendor'] !== null) { isvendor = 0; }
      for (let i = 0; i < options_on.length - isvendor; i++)
      {
        let option = $('<option></option>').text(options_on[i].innerText).attr({value: window.root + options_on[i].value});
        dropdown.append(option);
      }

      header.append(dropdown);
    }
    else
    {
      // User not logged in / sessionID expired - Create login and sign up links
      header.append($('<a></a>').text('Log In / Sign Up!').attr(
      {
        href: window.root + 'account/login.html',
        id: 'nav-login'
      }));
    }

    // Attach search bar event handlers
    $('#header_search').submit(function()
    {
      let elements = $('#nav-searchbar');

      let search = (elements.val()).replace(/ /g,'+');
      if (search === '') { return false; }

      window.location.href = window.root + 'results.html?search=' + search;
    });

  });

  container.prepend(header);
};