/**
 * Fires when the register-vendor form has been submitted
 * @param ev The submit event.
 */
function register_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  window.QueryManager.post('REGISTER_VENDOR', window.getCookie('sessionID'),
  {
    name: $('#register-vendor-name').val(),
    description: $('#register-vendor-description').val(),
  },
  function()
  {
    // Register Image
    console.log($('#register-vendor-image').val());
    window.QueryManager.addVendorImage(window.getCookie('sessionID'), $('#register-vendor-image')[0].files[0]);
    //window.location.href = 'manage.html';
  });
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