  /* ************************
   * add trigger event
   ************************ */
  try {
    new CustomEvent('');
  } catch (e) {
    console.log('no CustomEvent');
    window.CustomEvent = function(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    window.CustomEvent.prototype = window.Event.prototype;
    //window.CustomEvent = CustomEvent;
  }

  window.CustomEvent.list = {};

  window.HTMLElement.prototype.trigger = function(event, datas) {
    if (!event || typeof event != 'string') {
      return;
    }

    var params = {
      bubbles: true,
      cancelable: true,
      detail: datas !== undefined ? datas : null
    };

    if (!window.CustomEvent.list[event] || window.CustomEvent.list[event].detail !== params.detail) {
      window.CustomEvent.list[event] = new CustomEvent(event, params);
    }

    return this.dispatchEvent(window.CustomEvent.list[event]);
  };
