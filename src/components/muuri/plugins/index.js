import Muuri from 'muuri';
import removeClass from 'muuri/src/utils/removeClass';

Muuri.Item.prototype.setKey = function(val) {
  this._key = val;
};

Muuri.Item.prototype.getKey = function() {
  return this._key;
};

Muuri.Item.prototype.setData = function(val) {
  this._data = val;
};

Muuri.Item.prototype.getData = function() {
  return this._data;
};

Muuri.Item.prototype._destroy = function(removeElement) {
  if (this._isDestroyed) return;

  var element = this._element;
  var grid = this.getGrid();
  var settings = grid._settings;
  var index = grid._items.indexOf(this);

  // Destroy handlers.
  this._release.destroy();
  this._migrate.destroy();
  this._layout.destroy();
  this._visibility.destroy();
  this._animate.destroy();
  this._animateChild.destroy();
  this._dragPlaceholder.destroy();
  this._drag && this._drag.destroy();

  // Remove all inline styles.
  element.removeAttribute('style');
  this._child.removeAttribute('style');

  // Remove item class.
  removeClass(element, settings.itemClass);

  // Remove item from Grid instance if it still exists there.
  index > -1 && grid._items.splice(index, 1);

  // Remove element from DOM.
  removeElement && element.parentNode && element.parentNode.removeChild(element);

  // Reset state.
  this._isActive = false;
  this._isDestroyed = true;
};