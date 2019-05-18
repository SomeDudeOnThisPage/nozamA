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

  // Make the call to the API
  window.QueryManager.register(elements[2].value, elements[0].value + " " + elements[1].value, elements[3].value);

  return false;
}

function login_action(ev)
{
  // Stop default event handling
  ev.preventDefault();
  ev.stopPropagation();

  let elements = document.getElementById("login").elements;

  if (!formFilled(elements))
  {
    formError("Empty fields are not allowed!");
    return false;
  }

  // Make the call to the API
  window.QueryManager.login(elements[0].value, elements[1].value);

  return false;
}