const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me';

export default class ItemImageDisplay extends HTMLElement
{
  generate(data)
  {
    let mainImage = document.createElement('img');
    mainImage.id = 'item-image-display-main-image';
    mainImage.setAttribute('src', data[0]);

    let stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', window.resources + 'css/elements/item-image-display.css');

    const sRoot = this.attachShadow({ mode : 'open' });
    sRoot.id = 'item-image-display-shadow-root';
    sRoot.appendChild(stylesheet);
    sRoot.appendChild(mainImage);

    let i = 0;
    data.forEach(function(image)
    {
      let button = document.createElement('button');
      let img = document.createElement('img');
      button.className = 'item-image-display-button';
      img.setAttribute('src', NOZAMA_IMAGE_PATH + '/' + image);
      button.appendChild(img);

      button.onclick = function()
      {
        mainImage.setAttribute('src', img.getAttribute('src'));
      };

      sRoot.appendChild(button);
      i++;
    });
  }

  constructor()
  {
    super();
  }
}