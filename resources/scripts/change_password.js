function form_submit(e)
{
  e.preventDefault();
  e.stopPropagation();

  if ($('#new-password').val() !== $('#new-password-again').val())
  {
    $('#error-message').text('Passwords do not match!');
    return false;
  }

  window.QueryManager.changePassword(window.getCookie('sessionID'), $('#new-password').val());
  return false;
}