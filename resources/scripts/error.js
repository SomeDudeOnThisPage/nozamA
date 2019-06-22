let secret_on = false;

// Idk manI wrote this drunk at like 3am in themorging
document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  let msg = url.searchParams.get('msg');

  document.getElementById('error-number').innerText = 'Error ' + id;
  document.getElementById('error-message').innerText = msg + '.';

  document.title = 'Error ' + id + ': ' + msg;
  // This code i awful but I wrote it at like 2 am so whatver
  document.getElementById('secret').onclick = function()
  {
    if (!secret_on)
    {
      let representation = document.createElement('img');
      representation.src = window.resources + 'img/db_irl.gif';
      representation.id = 'representation';

      document.getElementById('dun-dun-dun-dun-da-da-da').volume = 0.05;
      document.getElementById('dun-dun-dun-dun-da-da-da').play();
      document.getElementById('whats-this').appendChild(representation);
      document.getElementById('secret').innerText = 'Enough!';
      secret_on = !secret_on;

      representation.onload = function()
      {
        window.cFooter();
      };
    }
    else
    {
      document.getElementById('dun-dun-dun-dun-da-da-da').pause();
      document.getElementById('secret').innerText = 'Again!';
      document.getElementById('whats-this').removeChild(document.getElementById('representation'));
      secret_on = !secret_on;
      window.cFooter();
    }
  }
});