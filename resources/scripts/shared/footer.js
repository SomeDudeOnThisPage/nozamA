export default function()
{
  window.addStylesheet('footer.css');

  let footer = $('<div></div>').attr({
    class: 'footer'
  });

  footer.load(window.resources + 'html/elements/footer.html');
  $('#main-container').append(footer);
}