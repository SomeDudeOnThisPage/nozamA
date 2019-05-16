function form_submit(ev)
{
  // TODO: Tell leo to give me email on user detail request

  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById('change-password-form').elements;

  // TODO: Validate old password
  // can't do shit here yet because we cannot check the old password with login...
  // Just change anyway...

  // TODO: Check if new password === old password...

  if (elements[1].value !== elements[2].value)
  {
    // Passwords do not match
    document.getElementById('error-message').innerText = 'Passwords do not match!';
  }

  window.QueryManager.changePassword(window.getCookie('sessionID'), elements[1].value);

  return false;
}

window.onload = function()
{
};