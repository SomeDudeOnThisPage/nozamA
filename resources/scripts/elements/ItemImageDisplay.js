import AsyncElement from "./AsyncElement.js";

const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me';

export default class ItemImageDisplay extends AsyncElement
{
  generate(data)
  {
    let mainImage = document.createElement('img');
    mainImage.id = 'item-image-display-main-image';
    mainImage.setAttribute('src', data[0]);
    this.shadowRoot.appendChild(mainImage);

    let i = 0;
    let self = this;
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

      self.shadowRoot.appendChild(button);
      i++;
    });
  }

  constructor()
  {
    super('item-image-display');
  }
}