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
  return asSubscribable;
});
