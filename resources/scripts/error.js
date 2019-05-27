let secret_on = false;

// Idk manI wrote this drunk at like 3am in themorging
document.addEventListener("ondataloaded", function(e)
{
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  let msg = url.searchParams.get('msg');

  document.getElementById('error-number').innerText = id;
  document.getElementById('error-message').innerText = msg;

  // This code i awful but I wrote it at like 2 am so whatver
  document.getElementById('secret').onclick = function()
  {
    if (!secret_on)
    {
      let representation = document.createElement('img');
      representation.src = window.resources + 'img/db_irl.gif';
      representation.id = 'representation';

      document.getElementById('dun-dun-dun-dun-da-da-da').play();
      document.getElementById('whats-this').appendChild(representation);
      document.getElementById('secret').innerText = 'Okay enough stop this.';
      secret_on = !secret_on;
    }
    else
    {
      document.getElementById('dun-dun-dun-dun-da-da-da').pause();
      document.getElementById('secret').innerText = 'Again!';
      document.getElementById('whats-this').removeChild(document.getElementById('representation'));
      secret_on = !secret_on;
    }
  }
});