define('asSubscribable', [], function () {
  function asSubscribable() {
    var subs = [];
    this.subscribe = function subscribe(obs, callback) {
      subs.push(obs.subscribe(callback));
    }
    this.dispose = function dispose() {
      subs.forEach(function (s) {
        s.dispose();
      });
    };
  };
  asSubscribable.extend = function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
  };
  return asSubscribable;
});
