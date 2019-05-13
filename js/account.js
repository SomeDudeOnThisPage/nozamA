let setSessionID = function(data)
{
  let session_id = JSON.parse(data).session_id;

  // Create cookie, no 'expires' so it expires whenever the session ends.
  document.cookie = 'sessionID=' + session_id;
};

let formError = function(msg)
{
  document.getElementById("register-error").innerText = msg;
};

let formFilled = function(elements)
{
  for (let i = 0; i < elements.length; i++)
  {
    if (elements[i].value === '')
    {
      return false;
    }
  }

  return true;
};

let c500error = function(xhr, textStatus, error)
{
  // If our xhr.status is 0 it means we got the funny CORS error, meaning that the API server must be down or messed up
  // Somehow the browser yoinks these though and gives us a 0, because guess what! When the server is down, the weird
  // CORS headers are obviously not set! 'Tis a vicious cycle...
  if (xhr.status === 0)
  {
    xhr.status = 500;
    textStatus = 'Internal Server Error';

    window.location.href = 'leo_your_server_sucks.html?id=' + xhr.status + '&msg=' + textStatus;
  }
};

function register_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById("register").elements;

  if (!formFilled(elements))
  {
    formError("Empty fields are not allowed!");
    return false;
  }


  // Case passwords do not match
  if (elements[3].value !== elements[4].value)
  {
    // Reset elements
    document.getElementById("regpwo").style.display = "inline";
    document.getElementById("regpwt").style.display = "inline";
    document.getElementById("regem").style.display = "none";
    formError("Passwords do not match!");

    // Clear password fields
    elements[3].value = '';
    elements[4].value = '';

    return false;
  }

  // Make call to the API
  $.ajax({
    type: 'POST',
    url: NOZAMA.API + NOZAMA.REGISTER,
    data:
      {
        "email": elements[2].value,
        "username": elements[0].value + " " + elements[1].value,
        "password": elements[3].value
      },
    error: function(xhr, textStatus, error)
      {
        c500error(xhr, textStatus, error);
        formError('The provided E-Mail address already exists.');

        // Reset elements
        document.getElementById("regpwo").style.display = "none";
        document.getElementById("regpwt").style.display = "none";
        document.getElementById("regem").style.display = "inline";
      },
  });

  // TODO: Sign in automatically, Append params to html here...
  window.location.href = "account.html";

  return false;
}

function login_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById("login").elements;

  // Validate against DB and retrieve sessionID
  if (!formFilled(elements))
  {
    formError("Empty fields are not allowed!");
    return false;
  }

  // Make the call to the API
  $.ajax({
    type: 'POST',
    url: NOZAMA.API + NOZAMA.LOGIN,
    data:
      {
        'email': elements[0].value,
        'password': elements[1].value,
      },
    error: function(xhr, textStatus, error)
    {
      c500error(xhr, textStatus, error);

      formError('The provided credentials were incorrect.');
      document.getElementById("login-main-password").innerText = '';
    },
    success: function(data)
    {
      setSessionID(data);
      window.location.href = "account.html";
    }
  });

  return false;
}