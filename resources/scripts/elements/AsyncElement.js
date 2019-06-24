/**
 * Base class for all custom DOM display elements that handle asynchronously requested data.
 */
export default class AsyncElement extends HTMLElement
{
  /**
   * Convenience method to get all child elements of the elements internal wrapper.
   */
  getInternalElements()
  {
    return (this.wrapper.get()[0]).children;
  }

  /**
   * The method (re-) generating the component. Note that elements defined in the HTML template of
   * the component cannot be accessed in a method called before this one, as they will not have
   * finished loading before.
   * @param data The data with which the element will be generated. Type of data depends on implementation.
   */
  generate(data)
  {
    throw new TypeError('Method \'generate\' is not defined');
  }

  /**
   * Called after the data displayed by this element has been loaded.
   * Default: Loads the HTML prototype of the element and calls the 'generate' method.
   * @param data
   */
  postDataLoaded(data)
  {
    let self = this;
    this.wrapper.load(window.resources + 'html/elements/' + this.cname + '.html', function()
    {
      // Async Elements can change the page size -> Check if our footer needs to be adjusted.
      // Not the best way to handle this but it works.
      window.cFooter();

      self.generate(data);
    });
  }

  /**
   * Called before the data displayed by this element has been loaded.
   * Default: Creates a 'loader'-div and appends it to the internal wrapper.
   */
  preDataLoaded()
  {
    this.wrapper.load('/nozamA/resources/html/elements/loader.html');
  }

  /**
   * A custom web component utilizing ShadowDOM to initialize a component structure on element creation.
   * Note: Remember to forward cname to lower constructors down the inheritance-line.
   * @param cname The class name of the containing div element inside the ShadowDOM.
   */
  constructor(cname)
  {
    // Make the class effectively abstract.
    if (new.target === AsyncElement)
    {
      throw new TypeError("Cannot construct AsyncElement instances directly");
    }

    super();

    this.cname = cname;

    // Initialize common DOM structure inside our ShadowDOM.
    this.attachShadow({mode : 'open'});
    window.addStylesheet('elements/' + cname + '.css', this.shadowRoot);

    // Create our wrapper div.
    this.wrapper = $('<div></div>').attr({class: cname});
    $(this.shadowRoot).append(this.wrapper);

    this.preDataLoaded();
  }
}