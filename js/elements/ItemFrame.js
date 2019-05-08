export default class ItemFrame extends HTMLElement
{
  constructor()
  {
    super();

    const s = 'hi!';

    const sRoot = this.attachShadow({mode: 'open'});

    // TODO: Don't use inner HTML...
    sRoot.innerHTML = `
      <p>I am an item frame!` + s + `</p>
    `;
  }
}