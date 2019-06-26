/**
 * All common API endpoints, mirrored in case any should change during development.
 * @type {{REGISTER: string, CHANGE_USER: string, VENDOR_IMAGE: string, REGISTER_VENDOR: string, SEARCH: string, RANDOM: string, MANUFACTURERS: string, ADD_CART: string, CHANGE_PASSWORD: string, ADD_ITEM_IMAGE: string, ADD_ITEM: string, USER: string, CATEGORIES: string, PURCHASE: string, ITEM: string, ORDER: string, EDIT_VENDOR: string, REMOVE_CART: string, CHANGE_ITEM: string, CHANGE_ADDRESS: string, ADD_MANUFACTURER: string, VENDOR: string, API: string, LOGIN: string}}
 */
const NOZAMA = {
  API: 'https://api.qwertxzy.me',
  LOGIN: '/login',
  REGISTER: '/register',
  ITEM: '/item',
  RANDOM: '/random',
  USER: '/profile',
  VENDOR: '/vendor',
  REGISTER_VENDOR: '/add_vendor',
  VENDOR_IMAGE: '/add_vendor_image',
  EDIT_VENDOR: '/change_profile/vendor',
  CHANGE_USER: '/change_profile/user',
  CHANGE_PASSWORD: '/change_password',
  SEARCH: '/search',
  ADD_CART: '/grab_item',
  REMOVE_CART: '/remove_item',
  CATEGORIES: '/categories',
  ADD_ITEM: '/add_item',
  ADD_ITEM_IMAGE: '/add_item_image',
  REMOVE_ITEM: '/delete_item',
  CHANGE_ITEM: '/change_item',
  CHANGE_ADDRESS: '/change_address',
  MANUFACTURERS: '/manufacturers',
  ADD_MANUFACTURER: '/add_manufacturer',
  ORDER: '/order',
  PURCHASE: '/purchase'
};

/**
 * Common error messages and handling options.
 * @type {{"0": {redirect: number}, "400": {msg: string, fatal: boolean}, "401": {msg: string, fatal: boolean}, "500": {msg: string, fatal: boolean}, "404": {msg: string, fatal: boolean}, "405": {msg: string, fatal: boolean}, "409": {msg: string, fatal: boolean}}}
 */
const emsg = {
  0: {redirect: 500},
  400: {msg: 'The provided data was incorrect', fatal: false},
  401: {msg: 'You are unauthorized to continue', fatal: true},
  404: {msg: 'The action you were trying to perform does not exist', fatal: true},  // TBH this should NEVER be returned by a request but better be safe than sorry.
  405: {msg: 'Disallowed', fatal: true},
  409: {msg: 'The provided data already exist', fatal: false},
  500: {msg: 'Internal Server Error', fatal: true},
};

/**
 * Default error checking function for ajax requests.
 * @param xhr The returned XHR object.
 * @param e_callback A custom callback, if desired.
 */
const cerror = function(xhr, e_callback)
{
  // If our xhr.status is 0 it means we got the funny CORS error, meaning that the API server must be down or messed up.
  // Somehow the browser yoinks these though and gives us a 0, because guess what! When the server is down, the
  // CORS headers are obviously not set!
  let propagate;
  propagate = e_callback(xhr); // Stop fatal redirect if we want to

  if (emsg[xhr.status].redirect)
  {
    xhr.status = emsg[xhr.status].redirect;
  }

  if (propagate && emsg[xhr.status].fatal)
  {
    window.location.href = window.root + 'e.html?id=' + xhr.status + '&msg=' + emsg[xhr.status].msg;
  }
};

/**
 * Static wrapper class holding a collection of static methods designed to push and receive data to / from the API.
 */
export default class QueryManager
{
  /**
   * Method to asynchronously retrieve data from our API.
   * @param d_type The base destination endpoint.
   * @param destination The endpoint url parameters.
   * @param callback The callback to be executed. In case callback is an object, case object.generate will be executed.
   * @hidden_param dataType Default: 'json' The data type to be received.
   * @hidden_param errorCallback: Default: null A custom error callback.
   */
  static get(d_type, destination, callback)
  {
    let url = NOZAMA.API + NOZAMA[d_type];
    let e_callback = arguments[4] || null;

    if (destination !== null)
    {
      url += '/' + destination;
    }

    $.ajax({
      type: 'GET',
      url: url,
      dataType: arguments[3] || 'json',
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
      error: function(xhr)
      {
        cerror(xhr, e_callback || function() { return true; });
      }
    });
  }

  /**
   * Method to asynchronously post data to our API.
   * @param d_type The base destination endpoint.
   * @param destination The endpoint url parameters.
   * @param data The data to be transmitted.
   * @param callback The success callback.
   * @hidden_param contentType Default: 'application/json' The content type defining how the data should be transmitted.
   * @hidden_param stringify: Default: true Whether the data should be turned into a JSON string or not.
   * @hidden_param errorCallback: Default: null A custom error callback.
   */
  static post(d_type, destination, data, callback)
  {
    if (!arguments[5])
    {
      data = JSON.stringify(data);
    }

    if (destination !== null && destination !== undefined)
    {
      destination = '/' + destination;
    }
    else
    {
      destination = '';
    }

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA[d_type] + destination,
      contentType: arguments[4] || 'application/json',
      data: data,
      /*xhrFields:
      {
        // Firefox support!
        withCredentials: true
      },*/
      success: function(data)
      {
        if (callback !== undefined && callback !== null)
        {
          callback(data);
        }
      },
      error: function(xhr, _1, _2)
      {
        cerror(xhr, arguments[6] || function() {});
      }
    });
  }

  /**
   * Adds an image to an item.
   * @param session The sessionID used to authorize the action.
   * @param item The itemID.
   * @param file The actual file.
   */
  static addImage(session, item, file, callback)
  {
    let fdata = new FormData();
    fdata.append('image', file);

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.ADD_ITEM_IMAGE + '/' + session + '/' + item,
      processData: false,
      contentType: false,
      data: fdata,
      error: function(xhr)
      {
        cerror(xhr, function() {});
      },
      success: function(data)
      {
        callback(data);
      }
    });
  }

  /**
   * Adds an image banner to a vendor.
   * @param session SessionID of vendor.
   * @param file Image file.
   */
  static addVendorImage(session, file)
  {
    let fdata = new FormData();
    fdata.append('image', file);

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.VENDOR_IMAGE + '/' + session,
      processData: false,
      contentType: false,
      data: fdata,
      error: function(xhr)
      {
        cerror(xhr, function() {});
      },
      success: function(data) {}
    });
  }

  /**
   * Performs login procedure and sets a session cookie
   */
  static login(email, password)
  {
    // Optional success callback
    let callback = arguments[2] || null;

    $.ajax({
      type: 'POST',
      url: NOZAMA.API + NOZAMA.LOGIN,
      data:
      {
        'email': email,
        'password': password,
      },
      error: function(xhr)
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

        // Pass of callback argument optional, default is redirect to index.
        if (callback !== null) { callback(); }
        else
        {
          window.location.href = window.root + 'index.html';
        }
      }
    });
  }

  /**
   * Performs registry procedure and creates a user account
   */
  static register(email, username, password)
  {
    // Optional success callback
    let callback = arguments[3] || null;

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
        if (callback !== null) { callback(); }
        else
        {
          window.location.href = "index.html";
        }
      },
      error: function(xhr)
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
      error: function(xhr)
      {
        cerror(xhr, function()
        {
          $('#error-message').text(xhr.status + ' ' + emsg[xhr.status].msg);
        })
      },
    });
  }
}














