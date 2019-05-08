// List of fatal errors -> They trigger a redirect to the error page.
let error_fatal = [
  500
];


// Shared ajax error handler. Should be attached to all
$(document).ajaxError(function(event, xhr, options, exc)
{
  alert("An error occurred!");
});