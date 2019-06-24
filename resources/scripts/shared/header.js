/**
 * Creates the nozamA header.
 */
export default function()
{
  window.addStylesheet('header.css');

  let container = $('#main-container');
  let header = $('<div></div>').attr({class: 'header'}).load(window.resources + 'html/elements/header.html', function()
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