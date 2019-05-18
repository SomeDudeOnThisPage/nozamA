export default function()
{
  window.addStylesheet('footer.css');

  let footer = document.createElement('div');
  footer.className = 'footer';

  // I'm lazy
  footer.innerHTML = `
      <a id="href-faq" href="/nozamA/faq.html">FAQ</a>
      <a id="href-become-vendor" href="/nozamA/faq.html#become-a-vendor">Become a vendor</a>
  `;

  document.getElementById('main-container').appendChild(footer);
}