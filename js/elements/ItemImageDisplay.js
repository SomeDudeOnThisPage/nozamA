export default class ItemImageDisplay extends HTMLElement
{
  generate(data)
  {
    let mainImage = document.createElement('img');
    this.appendChild(mainImage);

    const sRoot = this.attachShadow({ mode : 'open' });

    let i = 0;

    // TODO: Tell leo to give me images, use placeholder rn
    data.forEach(function(image)
    {
      let button = document.createElement('button');
      let img = document.createElement('img');
      img.setAttribute('src', 'resources/img/img_missing.png');
      button.appendChild(img);

      button.onclick = function()
      {
        mainImage.setAttribute('src', img.getAttribute('src'));
      };

      sRoot.appendChild(button);
      i++;
    });
  }
}