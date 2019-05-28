document.addEventListener("ondataloaded", function(e)
{
  // Check if we even have a user...
  if (!window.user) { window.location.href = 'login.html'; }
  // Check if the user wants to logout...
  if (new URL(window.location.href).searchParams.get('logout') === 'yes') { window.logout(); }
  // Check if user has changed his password
  if (new URL(window.location.href).searchParams.get('password_changed') === 'yes') { alert('Your password has changed'); }

  let pData = $('#info')[0];
  let aData = $('#address')[0];

  pData.populate(window.user);
  aData.populate(window.user);

  pData.setCallback(function() {
    window.QueryManager.post('CHANGE_USER', window.getCookie('sessionID'), {
      'name': $('#name').val(),
      'leave_vendor': false
    });
  });

  aData.setCallback(function() {
    window.QueryManager.post('CHANGE_ADDRESS', window.getCookie('sessionID'), {
      'city': $('#city').val(),
      'zip': $('#zip').val(),
      'street': $('#street').val()
    });
  });
});