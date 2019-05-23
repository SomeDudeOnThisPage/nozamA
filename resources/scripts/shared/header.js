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

  // Create the header DOM elements
  let header = document.createElement('div');
  header.className = 'header';

  // Check if we have a valid session and set the headers' links accordingly
  if (window.user)
  {
    // Create dropdown menu containing account links
    let dropdown = document.createElement('select');
    dropdown.id = 'nav-select';

    // Create a placeholder for the dropdown menu
    let dropdown_ph = document.createElement('option');
    dropdown_ph.hidden = true;
    dropdown_ph.innerText = 'Your Account';
    dropdown.appendChild(dropdown_ph);

    // Generate our links
    let isvendor = VENDOR_SPECIFIC;
    if (window.user['belongs_to_vendor'] !== null) { isvendor = 0; }
    for (let i = 0; i < options_on.length - isvendor; i++)
    {
      let option = document.createElement('option');
      option.setAttribute('value', window.root + options_on[i].value);
      option.innerText = options_on[i].innerText;
      dropdown.appendChild(option);
    }

    header.appendChild(dropdown);
  }
  else
  {
    // User not logged in / sessionID expired - Create login and sign up links
    let lisu = document.createElement('a');
    lisu.id = 'nav-login';
    lisu.href = window.root + 'account/login.html';
    lisu.innerText = 'Log In / Sign Up!';
    header.appendChild(lisu);
  }

  // I'm lazy.
  header.innerHTML += `
    <a href="/nozamA/index.html"><img id="nav-logo" src="/nozamA/resources/img/logo.png" alt=""></a>
    
    <form id="header_search" method="post">
        <div id="nav-search">
            <input id="nav-searchbar" name="nav_searchbar" class="search_bar" type="text" placeholder="Search...">
            <button id="search-button" class="search_button" type="submit">Q</button>
        </div>
    </form>`;
  document.getElementById('main-container').prepend(header);

  // Attach event handlers
  // Doing this AFTER adding the header to the DOM, otherwise the events won't fire...
  document.getElementById('header_search').onsubmit = (ev => {
    ev.preventDefault();
    ev.stopPropagation();

    // Get search results and split
    let elements = document.getElementById('header_search').elements;

    let search = (elements[0].value).replace(/ /g,'+');
    if (search === '') { return false; }
    window.location.href = window.root + 'results.html?search=' + search;

    return false;
  });

  if (document.getElementById('nav-select') !== null) // Check if our element isn't null otherwise we get an error...
  {
    document.getElementById('nav-select').onchange = (ev => {
      document.location.href = document.getElementById('nav-select').value;
    });
  }
};