/**
 * Loads an item from the database
 */
export default class Item
{
  constructor(id)
  {
    this.data = window.QueryManager.getItem(id);
  }
}