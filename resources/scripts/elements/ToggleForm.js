const buttonText = {
  true: 'Edit',
  false: 'Confirm'
};

const formElements = 'input, textarea, select, button';
const notFormElements = '.toggle-button';
/**
 * Script component of the custom <toggle-form> html component.
 * A ToggleForm component needs to contain a <button> tag with
 * class='.toggle-button' and a <p> tag with id='form-error'.
 *
 * Example:
 * <toggle-form>
 *   <button class="toggle-button">Edit</button>
 *   <input>...
 *   <p id="form-error"></p>
 * </toggle-form>
 */
export default class ToggleForm extends HTMLElement
{
  setError(msg)
  {
    $(this).find('.form-error').text(msg);
  }

  toJSON()
  {
    let data = {};

    this.form = $(this).find(formElements).not(notFormElements);
    this.form.each(function()
    {
      if ($(this).attr('tf-parse-ignore') === undefined)
      {
        let objData = $(this).val();

        if ($(this).attr('multiple') !== undefined)
        {
          objData = objData.split(/[ ,]+/);
        }

        data[$(this).attr('id')] = objData;
      }
    });

    return data;
  }

  disable()
  {
    this.form = $(this).find(formElements).not(notFormElements); // Find again, Dynamic forms!!
    this.form.attr('disabled', !this.form.attr('disabled'));
  }

  toggle()
  {
    this.form = $(this).find(formElements).not(notFormElements); // Find again, Dynamic forms!!

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
    this.form.each(function()
    {
      $(this).val(data[$(this).attr('id')]);
    });
  }

  setCallback(callback)
  {
    this.callback = callback;
  }

  constructor()
  {
    super();

    this.form = $(this).find(formElements).not(notFormElements);

    // Disable input fields
    this.form.attr('disabled', true);
    this.isDisabled = true;

    // Attach button handlers
    let self = this;
    this.button = $(this).find('.toggle-button');
    this.button.click(function() { self.toggle() });
  }
}