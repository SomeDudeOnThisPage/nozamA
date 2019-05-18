// APPLICATION CONSTANTS
const NOZAMA = {
  API: 'https://api.qwertxzy.me',
  LOGIN: '/login',
  REGISTER: '/register',
  ITEM: '/item',
  RANDOM: '/random',
  USER: '/profile',
  VENDOR: '/vendor',
  CHANGE_PASSWORD: '/change_password'
};

// ERROR MESSAGES
const emsg = {
  0: {redirect: 500},
  400: {msg: 'The provided credentials were incorrect', fatal: false},
  401: {msg: 'You are unauthorized to continue', fatal: false},
  404: {msg: '', fatal: false},
  409: {msg: 'The provided E-Mail address already exists', fatal: false},
  500: {msg: 'Internal Server Error', fatal: true},
};

// ERROR HANDLING METHODS
const cerror = function(xhr, e_callback)
{
  // If our xhr.status is 0 it means we got the funny CORS error, meaning that the API server must be down or messed up
  // Somehow the browser yoinks these though and gives us a 0, because guess what! When the server is down, the weird
  // CORS headers are obviously not set! 'Tis a vicious cycle...

  if (emsg[xhr.status].redirect)
  {
    xhr.status = emsg[xhr.status].redirect;
  }

  if (emsg[xhr.status].fatal)
  {
    window.location.href = 'leo_your_server_sucks.html?id=' + xhr.status + '&msg=' + emsg[xhr.status].msg;
  }
  else
  {
    e_callback();
  }
};

export default class QueryManager
{
  /**
   * Method to asynchronously retrieve data from our API.
   * @param d_type The type of data to be requested from the API.
   * @param id The id of the data to be requested.
   * @param callback The callback to be executed. In case callback is an object, case object.generate will be executed.
   */
  static get(d_type, id, callback)
  {
    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA[d_type] + '/' + id,
      dataType: 'json',
      success: function(result)
      {
        if (typeof callback === 'object')
        {
          callback.generate(result);
        }
        else
        {
          callback(result);
        }
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, null);
      }
    });
  }

  /**
   * Performs login procedure and sets a session cookie
   */
  static login(email, password)
  {
    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.LOGIN,
      data:
        {
          'email': email,
          'password': password,
        },
      error: function(xhr, _1, _2)
      {
        console.log(xhr.status + " fuck");
        cerror(xhr, function()
        {
          document.getElementById("register-error").innerText = 'The provided credentials were incorrect.';
          document.getElementById("login-main-password").innerText = '';
        });
      },
      success: function(data)
      {
        let session_id = JSON.parse(data)["session_id"];
        // Create cookie, no 'expires' so it expires whenever the session ends.
        document.cookie = 'sessionID=' + session_id;
        window.location.href = "index.html";
      }
    });
  }

  /**
   * Performs registry procedure and creates a user account
   */
  static register(email, username, password)
  {
    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.REGISTER,
      data:
        {
          "email": email,
          "username": username,
          "password": password
        },
      success: function()
      {
        window.location.href = "index.html";
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function()
        {
          document.getElementById("regpwo").style.display = "none";
          document.getElementById("regpwt").style.display = "none";

          document.getElementById("regem").style.display = "inline";
          document.getElementById("register-error").innerText = emsg[xhr.status].msg;
        });
      },
    });
  }

  static changePassword(sessionID, password)
  {
    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.CHANGE_PASSWORD + '/' + sessionID,
      data: { 'password' : password },
      success: function()
      {
        // href to account page
        window.location.href = 'index.html?password_changed=yes';
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function()
        {
          document.getElementById('error-message').innerText = xhr.status + ' ' + esmg[xhr.status].msg;
        })
      },
    });
  }
}














