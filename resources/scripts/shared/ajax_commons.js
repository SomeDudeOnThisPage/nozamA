// APPLICATION CONSTANTS
const NOZAMA = {
  API: 'https://api.qwertxzy.me',
  LOGIN: '/login',
  REGISTER: '/register',
  ITEM: '/item',
  RANDOM: '/random',
  USER: '/profile',
  VENDOR: '/vendor',
  REGISTER_VENDOR: '/add_vendor',
  EDIT_VENDOR: '/change_profile/vendor',
  CHANGE_PASSWORD: '/change_password',
  SEARCH: '/search',
  ADD_CART: '/grab_item',
  CATEGORIES: '/categories',
  ADD_ITEM: '/add_item',
  ADD_ITEM_IMAGE: '/add_item_image'
};

const NOZAMA_IMAGE_PATH = 'https://progex.qwertxzy.me/';

// ERROR MESSAGES
const emsg = {
  0: {redirect: 500},
  400: {msg: 'The provided credentials were incorrect', fatal: false},
  401: {msg: 'You are unauthorized to continue', fatal: false},
  404: {msg: '', fatal: true},  // TBH this should NEVER be returned by a request but better be safe than sorry.
  409: {msg: 'The provided credentials already exist', fatal: false},
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
    //window.location.href = '/nozamA/leo_your_server_sucks.html?id=' + xhr.status + '&msg=' + emsg[xhr.status].msg;
  }
  else
  {
    e_callback();
  }
};

/**
 * Static class holding a collection of static methods designed to push and receive data to / from the API.
 */
export default class QueryManager
{
  /**
   * Checks if an image exists and returns a default path if none is found.
   * @param path The image path on our server.
   * @param img The <img> element that needs to have its' src-attribute changed.
   */
  static loadImage(path, img)
  {
    $.get(NOZAMA_IMAGE_PATH + path)
      .done(function()
      {
        // Image exists
        img.src = NOZAMA_IMAGE_PATH + path;
      })
      .fail(function()
      {
        // Image does not exist
        img.src = window.resources + 'img/img_missing.png';
      });
  }

  /**
   * Method to asynchronously retrieve data from our API.
   * @param d_type The type of data to be requested from the API.
   * @param id The id of the data to be requested.
   * @param callback The callback to be executed. In case callback is an object, case object.generate will be executed.
   */
  static get(d_type, id, callback)
  {
    let url = NOZAMA.API + NOZAMA[d_type];

    if (arguments[1] !== null)
    {
      url += '/' + id;
    }

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result)
      {
        if (typeof callback === 'object')
        {
          callback.postDataLoaded(result);
        }
        else
        {
          callback(result);
        }
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function() {});
      }
    });
  }

  static post(d_type, id, data, callback)
  {
    if (!arguments[5])
    {
      data = JSON.stringify(data);
    }

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA[d_type] + '/' + id,
      contentType: arguments[4] || 'application/json',
      data: data,
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function() {});
      },
      success: function(data)
      {
        callback(data);
      }
    });
  }

  static addImage(session, item, file)
  {
    let fdata = new FormData();
    fdata.append('image', file);

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.ADD_ITEM_IMAGE + '/' + session + '/' + item,
      processData: false,
      contentType: false,
      data: fdata,
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function() {});
      },
      success: function(data)
      {
        console.log('ADDED!');
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
        cerror(xhr, function()
        {
          $('#error-message').text('The provided credentials were incorrect.');
          $("#login-main-password").text('');
        });
      },
      success: function(data)
      {
        let session_id = JSON.parse(data)["session_id"];

        // Create cookie, no 'expires' so it expires whenever the session ends (The browser is closed).
        document.cookie = 'sessionID=' + session_id + ';path=/;';
        window.location.href = window.root + 'index.html';
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
          $('#error-message').text(emsg[xhr.status].msg);
        });
      },
    });
  }

  /**
   * Performs password change procedure.
   * @param sessionID The session id of the currently logged in user.
   * @param password The new password.
   */
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
          $('#error-message').text(xhr.status + ' ' + emsg[xhr.status].msg);
        })
      },
    });
  }

  static registerVendor(name, description, sessionID)
  {
    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.REGISTER_VENDOR + '/' + sessionID,
      contentType: 'application/json',
      data: JSON.stringify({
        "name": name,
        "description": description
      }),
      success: function()
      {
        window.location.href = window.root + 'vendor/index.html';
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function()
        {
          $('#error-message').text(xhr.status + ' ' + emsg[xhr.status].msg);
        });
      },
    });
  }

  static grabItem(sessionID, itemID, amount)
  {
    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.ADD_CART + '/' + sessionID + '/' + itemID + '/' + amount,
      contentType: 'application/json',
      data: {},
      success: function()
      {
        $('#total-cart').text('Total of #' + amount + ' items in cart.');
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, function()
        {
          $('#error-message').text(xhr.status + ' ' + emsg[xhr.status].msg);
        });
      },
    });
  }
}














