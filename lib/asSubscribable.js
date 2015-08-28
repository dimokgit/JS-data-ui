define('asSubscribable', [], function () {
  function asSubscribable() {
    var subs = [];
    this.subscribe = function subscribe(obs, callback) {
      subs.push(obs.subscribe(callback));
      return subs;
    }
    this.dispose = function dispose() {
      while (subs.length)
        subs.pop().dispose();
      return subs;
    };
  };
  asSubscribable.extend = function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
  };
  return asSubscribable;
});
