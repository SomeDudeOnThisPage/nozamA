/**
 * Fires when the register-vendor form has been submitted
 * @param ev The submit event.
 */
function register_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById('register-vendor').elements;

  for (let i = 0; i < elements.length; i++)
  {
    console.log(elements[i].value);
  }

}

window.onload = function()
{
  // If the user already has a shop redirect him to his page
  if (window.user['belongs_to_vendor'] !== null)
  {
    window.location.href = 'vendor.html';
  }

  // Otherwise handle our form
};