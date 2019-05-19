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
  console.log('Trying to register vendor with name=' + elements[0].value + ' and description=' + elements[1].value);
  window.QueryManager.registerVendor(elements[0].value, elements[1].value, window.getCookie('sessionID'));
  return false;
}

document.addEventListener("ondataloaded", function(e)
{
  // If there is no user redirect him to the login page
  if (window.user === false)
  {
    window.location.href = window.root + 'account/login.html?msg=You need to login to use this feature.';
    return;
  }

  // If the user already has a shop redirect him to his page
  if (window.user['belongs_to_vendor'] !== null)
  {
    window.location.href = window.root + 'vendor/index.html';
  }
});