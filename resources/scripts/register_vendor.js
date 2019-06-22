/**
 * Fires when the register-vendor form has been submitted
 * @param ev The submit event.
 */
function register_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  // Check if banner image satisfies requirements
  let img = new Image();

  img.src = window.URL.createObjectURL($('#register-vendor-image')[0].files[0]);

  img.onload = function()
  {
    let d = img.naturalWidth / img.naturalHeight;
    window.URL.revokeObjectURL( img.src );
    console.log(d);

    if (d !== 10 && d !== 5 && d !== /* Don't ask why. */ 3.3333333333333335)
    {
      window.error('Shop banner does not meet requirement: Dimensions must be w/h: 10:{1 or 2 or 3}');
      return false;
    }
    else
    {
      window.QueryManager.post('REGISTER_VENDOR', window.getCookie('sessionID'),
      {
        name: $('#register-vendor-name').val(),
        description: $('#register-vendor-description').val(),
      },
      function()
      {
        // Register Image
        window.QueryManager.addVendorImage(window.getCookie('sessionID'), $('#register-vendor-image')[0].files[0]);
        window.location.href = window.root + '/vendor/manage.html';
      });
    }
  };
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
    window.location.href = window.root + 'vendor/index.html?vendor=' + window.user['belongs_to_vendor'];
  }
});