// APPLICATION CONSTANTS
const NOZAMA = {
  API: 'https://api.qwertxzy.me',
  LOGIN: '/login',
  REGISTER: '/register',
  ITEM: '/item',
  RANDOM: '/random',
  USER: '/profile',
  VENDOR: '/vendor'
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
   * Gets item data from the database
   */
  static getItem(id)
  {
    let data = {};

    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA.ITEM + '/' + id,
      dataType: 'json',
      async: false, // This is VERY bad, but in order to load the objects on the page we NEED the data first...
      success: function(result)
      {
        data = result;
      },
      error: function(xhr, status, error)
      {
        cerror(xhr, null);
      }
    });

    return data;
  }

  /**
   * Returns a list of item id's determined by the input search string.
   * @param str The search string.
   */
  static getItemListBySearch(str)
  {
    let data = {};

    // THIS IS NOT IMPLEMENTED YET! - RETURN EMPTY DATA!
    return data;
  }

  /**
   * Returns n random item IDs.
   * @param num The amount of items needed.
   */
  static getRandomItemSequence(num)
  {
    let data = {};

    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA.RANDOM + '/' + num,
      dataType: 'json',
      async: false, // This is VERY bad, but in order to load the objects on the page we NEED the data first...
      success: function(result)
      {
        data = result;
      },
      error: function(xhr, status, error)
      {
        cerror(xhr, null);
      }
    });

    return data;
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
        window.location.href = "account.html";
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
        // TODO: Sign in automatically, Append params to html here...
        window.location.href = "account.html";
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

  static getUserData(sessionID)
  {
    let data = {};

    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA.USER + '/' + sessionID,
      dataType: 'json',
      async: false, // This is VERY bad, but in order to load the objects on the page we NEED the data first...
      success: function(result)
      {
        data = result;
      },
      error: function(xhr, status, error)
      {
        cerror(xhr, function() {});
      }
    });

    return data || false;
  }

  static getVendorData(vendorID)
  {
    let data = {};

    $.ajax({
      type: 'GET',
      url: NOZAMA.API + NOZAMA.VENDOR + '/' + vendorID,
      dataType: 'json',
      async: false, // This is VERY bad, but in order to load the objects on the page we NEED the data first...
      success: function(result)
      {
        data = result;
      },
      error: function(xhr, status, error)
      {
        cerror(xhr, function() {});
      }
    });

    return data || false;
  }
}














