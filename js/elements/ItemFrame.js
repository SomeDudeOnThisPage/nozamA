import Item from './Item.js';

export default class ItemFrame extends HTMLElement
{
  constructor()
  {
    super();

    this.item = new Item(this.innerText || 1);
    this.item.d_print();
    this.href = 'item.html?item=' + this.innerText;

    // TODO: Get item name
    const sRoot = this.attachShadow({mode: 'open'});

    // TODO: Don't use inner HTML...
    sRoot.innerHTML = `
      <div class="item-frame">
        <link rel="stylesheet" href="css/elements/item-frame.css">
        <a href="` + this.href + `" class="item-frame-name">` + this.item.data.name + `</a>
        <a href ="` + this.href + `" class="item-frame-image"><img src="resources/img/img_missing.png" alt=""></a>
        <p>` + this.item.data.price + '€' + `</p>
      </div>
    `;
  }
}