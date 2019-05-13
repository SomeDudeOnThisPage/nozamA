/*
  Generic footer writer to implement on all pages.
  This footer is created once while the page loads -> document.write is sufficient here.
 */

export default function()
{
  window.addStylesheet('css/footer.css');

  let footer = document.createElement('div');
  footer.className = 'footer';

  // I'm lazy
  footer.innerHTML = `
      <a id="href-faq" href="faq.html">FAQ</a>
  `;

  document.getElementById('main-container').appendChild(footer);
}