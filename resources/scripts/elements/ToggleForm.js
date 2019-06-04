const buttonText = {
  true: 'Edit',
  false: 'Confirm'
};

const formElements = 'input, textarea, select, button';

/**
 * Script component of the custom <toggle-form> html component.
 * A ToggleForm component needs to contain a <form> tag, a <button> tag
 * and a <p> tag with id='form-error'.
 *
 * Example:
 * <toggle-form>
 *   <button>Edit</button>
 *   <form>...</form>
 *   <p id="form-error"></p>
 * </toggle-form>
 */
export default class ToggleForm extends HTMLElement
{
  setError(msg)
  {
    $(this).find('.form-error').text(msg);
  }

  getStatus()
  {
    return this.isDisabled;
  }

  toggle()
  {
    this.form = $(this).find(formElements).not('.toggle-button'); // Find again, Dynamic forms!!

    this.form.attr('disabled', !this.form.attr('disabled'));
    this.isDisabled = !this.isDisabled;
    this.button.text(buttonText[this.isDisabled]);

    this.setError('');

    let form = this.form;

    if (form.attr('disabled'))
    {
      this.callback();
    }
  }

  populate(data)
  {
    this.form.each(function(index, element)
    {
      // Why are you like this JQuery...
      element = $(element);
      element.val(data[element.attr('id')]);
    });
  }

  setCallback(callback)
  {
    this.callback = callback;
  }

  constructor()
  {
    super();

    this.form = $(this).find(formElements).not('.toggle-button');

    // Disable input fields
    this.form.attr('disabled', true);
    this.isDisabled = true;

    // Attach button handlers
    let self = this;
    this.button = $(this).find('button:first');
    this.button.click(function() { self.toggle() });
  }
}