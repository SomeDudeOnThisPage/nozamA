let form_enabled = false;

let user_element_translation = {
  'name' : 'name',
  'email' : 'email',
  'address-city' : 'city',
  'address-zip' : 'zip',
  'address-street' : 'street',
  'vendor' : 'belongs_to_vendor'
};

window.onload = function()
{
  // Before we do anything, check if the user wants to logout...
  let logout = new URL(window.location.href).searchParams.get('logout');
  if (logout === 'yes')
  {
    // Perform logout procedure
    window.logout();
  }

  // Get User Information and fill in the fields
  let elements = Array.from(document.getElementById('account-info-form').elements);

  // TODO: Move this into the getCookie function
  if (!window.user) { window.location.href = 'login.html'; }

  // Populate fields with user data, right now there's a lot of undefined due to missing data...
  elements.forEach(function(element)
  {
    element.value = window.user[user_element_translation[element.id.replace('account-', '')]];
  });

  let editButton = document.getElementById('account-info-edit');
  editButton.onclick = function()
  {
    if ((form_enabled = !form_enabled) === true) // Was false, enable form elements
    {
      elements.forEach(function(element)
      {
        element.removeAttribute('disabled');
      });

      editButton.innerText = 'Confirm';
    }
    else // Was true, confirm, send data and disable forms
    {
      elements.forEach(function(element)
      {
        element.setAttribute('disabled', null);
      });

      // TODO: Make server call

      editButton.innerText = 'Edit Information';
    }
  };
};