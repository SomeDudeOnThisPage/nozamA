const buttonText = {
  disabled: 'Edit',
  undefined: 'Confirm'
};

export default class ToggleForm extends HTMLElement
{
  toggle()
  {
    let form = this.form;
    form.attr('disabled', !form.attr('disabled'));
    this.button.text(buttonText[form.attr('disabled')]);

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

    this.form = $(this).find('input, textarea');

    // Disable input fields
    this.form.attr('disabled', true);

    // Attach button handlers
    let self = this;
    this.button = $(this).find('button');
    this.button.click(function() { self.toggle() });
  }
}