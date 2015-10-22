define('asSubscribable', ["jquery"], function ($) {
  function asSubscribable() {
    this.className = this.constructor.name;
    var subs = [];
    this.subscribe = function subscribe(obs, callback) {
      subs.push(obs.subscribe(callback));
      return subs;
    }
    var ons = [];
    this.addOn = function addOn(element, event, handler) {
      $(element).on(event, handler);
      ons.push(element);
      return ons;
    }
    this.dispose = function dispose() {
      while (subs.length)
        subs.pop().dispose();
      while (ons.length)
        $(ons.pop()).off();
      return { subs: subs, ons: ons };
    };
  };
  asSubscribable.extend = function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
  };
  return asSubscribable;
});
