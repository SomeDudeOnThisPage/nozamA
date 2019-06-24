import AsyncElement from "./AsyncElement.js";
const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me';

export default class ItemImageDisplay extends AsyncElement
{
  /**
   * We never load an item in here so postDataLoaded would never be called.
   */
  preDataLoaded()
  {
    this.wrapper.load(window.resources + 'html/elements/item-image-display.html');
  }

  /**
   * Create a button for each image and display the image on the main image on click.
   * @param data
   */
  generate(data)
  {
    $(this.shadowRoot).find('#main-image').attr({
      'src': NOZAMA_IMAGE_PATH + '/' + data[0]
    });

    let self = this;
    data.forEach(function(image)
    {
      /*let img = $('<img>').attr({
        src: NOZAMA_IMAGE_PATH + '/' + image,
        alt: 'oops',
      });*/

      let button = $('<button>')
      .attr({
        class: 'image-button',
        imgpath: NOZAMA_IMAGE_PATH + '/' + image
      })
      .css('background-image', 'url(' + NOZAMA_IMAGE_PATH + '/' + image + ')');

      button.click(function()
      {
        $(self.shadowRoot).find('#main-image').attr(
        {
          src: $(this).attr('imgpath')
        });
      });

      //button.append(img);
      self.wrapper.append(button);
    });
  }

  constructor()
  {
    super('item-image-display');
  }
}