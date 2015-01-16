(function(exports) {
  try {
    new CustomEvent('');
  } catch (e) {
    var CustomEvent = function(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    exports.CustomEvent.prototype = exports.Event.prototype;
    exports.CustomEvent = CustomEvent;
  }

  exports.CustomEvent.list = {};

  function fireEvent(event, datas) {
    if (!event || typeof event != 'string') {
      return;
    }

    var params = {
      bubbles: true,
      cancelable: true,
      detail: datas !== undefined ? datas : null
    };

    if (!exports.CustomEvent.list[event] || exports.CustomEvent.list[event].detail !== params.detail) {
      exports.CustomEvent.list[event] = new CustomEvent(event, params);
    }

    return this.dispatchEvent(exports.CustomEvent.list[event]);
  };

  exports.HTMLElement.prototype.trigger = fireEvent;
})(this);
