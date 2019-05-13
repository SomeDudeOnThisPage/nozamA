//import QueryManager from './../shared/ajax_commons.js'

/**
 * Loads an item from the database
 */
export default class Item
{
  constructor(id)
  {
    this.data = QueryManager.getItem(id);
  }
}