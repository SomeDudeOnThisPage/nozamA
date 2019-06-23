let formError = function(msg)
{
  $('#register-error').text(msg);
};

function register_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById("register").elements;
  console.log(elements);

  // Case passwords do not match
  if ($('#password').val() !== $('#password-again').val())
  {
    // Reset elements
    $('#regwo').css('display', 'inline');
    $('#regpwt').css('display', 'inline');
    $('#regem').css('display', 'none');
    formError("Passwords do not match!");

    // Clear password fields
    $('#password').val('');
    $('#password-again').val('');

    return false;
  }

  // Make the registry call to the API
  window.QueryManager.register($('#email').val(), $('#first-name').val() + " " + $('#last-name').val(), $('#password').val(), function()
  {
    // Login User without redirect
    window.QueryManager.login($('#email').val(), $('#password').val(), function()
    {
      // Make the address change call to the API
      window.QueryManager.post('CHANGE_ADDRESS', window.getCookie('sessionID'), {
          'city': $('#city').val(),
          'zip': $('#zip').val(),
          'street': $('#street').val()
        },
        function()
        {
          window.location.href = window.root + 'index.html';
        });
    });
  });

  return false;
}

function login_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById("login").elements;

  // Make the call to the API
  window.QueryManager.login(elements[0].value, elements[1].value);

  return false;
}