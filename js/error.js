window.onload = function()
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  let msg = url.searchParams.get('msg');

  document.getElementById('error-number').innerText = id;
  document.getElementById('error-message').innerText = msg;
};