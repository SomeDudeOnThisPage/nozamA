import ItemFrame from "./ItemFrame.js";

/**
 * A custom HTML element to display the name, price, one image, vendor,
 * manufacturer and amount / a 'delete from cart - button'.
 *
 * These elements should preferably be listed in an ItemList object.
 * If the logged in user is a vendor themselves and the item is sold by them,
 * the frame will have special attributes to allow the vendor to edit or delete
 * the item.
 * This extended component will also display a number field where the user can set the
 * amount of the item he wants to buy, as well as remove it from the cart entirely.
 *
 * @author Robin Buhlmann
 * @version 0.1
 */
export default class CartItemFrame extends ItemFrame
{
  setItem(id, amount)
  {
    $(this).attr('amount', amount);
    super.setItem(id);
  }

  generate(data)
  {
    $(this.wrapper).find('#amount').val($(this).attr('amount'));

    let self = $(this);
    $(this.wrapper).find('button').click(function()
    {
      let destination = window.getCookie('sessionID') + '/' + self.attr('item') + '/0';
      window.QueryManager.post('ADD_CART', destination, null, function()
      {
        self.remove();
      });
    });

    $(this.wrapper).find('#amount').change(function()
    {
      let destination = window.getCookie('sessionID') + '/' + self.attr('item') + '/' + $(this).val();
      window.QueryManager.post('ADD_CART', destination, null, function() {});
    });

    super.generate(data);
  }

  constructor()
  {
    super(arguments[0] || 'cart-item-frame');
  }
}
