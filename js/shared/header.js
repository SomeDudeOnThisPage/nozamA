/*
  Generic header writer to implement on all pages.
  This header is created once while the page loads -> document.write is sufficient here.
 */

const options_on = [];
  options_on[0] = {value : 'account.html#account-info', innerText : 'Account Information'};
  options_on[1] = {value : 'account.html#account-history', innerText : 'Payment History'};
  options_on[2] = {value : 'cart.html', innerText : 'Shopping Cart'};

function submit_form(ev)
{
  ev.preventDefault();
  ev.stopPropagation();

  // Get search results and split
  let elements = document.getElementById('header_search').elements;

  let search = (elements[0].value).replace(/ /g,'+');
  window.location.href = 'results.html?search=' + search;

  return false;
}

/**
 * Creates the nozamA header.
 */
export default function()
{
  window.addStylesheet('css/header.css');

  // Create the header DOM elements
  let header = document.createElement('div');
  header.className = 'header';

  // Check if we have a valid session and set the headers' links accordingly
  let cookie = window.getCookie('sessionID');
  if (cookie !== '' && window.QueryManager.getUserData(cookie))
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
    for (let i = 0; i < options_on.length; i++)
    {
      let option = document.createElement('option');
      option.setAttribute('value', options_on[i].value);
      option.innerText = options_on[i].innerText;
      dropdown.appendChild(option);
    }

    // DONT FORGET TO ADD IT TO THE DOM OMG I SPEND LIKE 30 MIN SEARCHING FOR THE ERROR...
    header.appendChild(dropdown);
  }
  else
  {
    // User not logged in / sessionID expired - Create login and sign up links
    let lisu = document.createElement('a');
    lisu.id = 'nav-login';
    lisu.href = 'login.html';
    lisu.innerText = 'Log In / Sign Up!';
    header.appendChild(lisu);
  }

  // I'm lazy.
  header.innerHTML += `
    <a href="index.html"><img id="nav-logo" src="resources/img/logo.png"></a>
    
    <form id="header_search" method="post" onsubmit="return submit_form(event)">
        <div id="nav-search">
            <input id="nav-searchbar" name="nav_searchbar" class="search_bar" type="text" placeholder="Search...">
            <button id="search-button" class="search_button" type="submit">Q</button>
        </div>
    </form>`;
  document.getElementById('main-container').prepend(header);

  // Attach event handlers
  // Doing this AFTER adding the header to the DOM, otherwise the events won't fire...
  if (document.getElementById('nav-select') !== null)
  {
    document.getElementById('nav-select').onchange = function()
    {
      document.location.href = document.getElementById('nav-select').value;
    };
  }
};