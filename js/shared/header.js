/*
  Generic header writer to implement on all pages.
  This header is created once while the page loads -> document.write is sufficient here.
 */

function subm(ev)
{
  ev.preventDefault();
  ev.stopPropagation();

  // Get search results and split
  let elements = document.getElementById('header_search').elements;

  let search = (elements[0].value).replace(/ /g,'+');
  window.location.href = 'results.html?search=' + search;

  return false;
}

document.write(`
<div class="header">
    
    <link rel="stylesheet" href="css/header.css">
    
    <a href="index.html"><img id="nav-logo" src="resources/img/logo.png"></a>
    <a href="account.html"><img id="nav-account" src="resources/img/nav_account.png"></a>
    <a href="cart.html"><img id="nav-cart" src="resources/img/nav_scart.png"></a>
    <a href="login.html">Log In / Sign Up</a>
    
    <form id="header_search" method="post" onsubmit="return subm(event)">
        <div id="nav-search">
            <input id="nav-searchbar" name="nav_searchbar" class="search_bar" type="text" placeholder="Search...">
            <button id="search-button" class="search_button" type="submit">Q</button>
        </div>
    </form>
 
</div>`
);