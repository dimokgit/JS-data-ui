/* jshint laxcomma:true*/
define(['knockout','underscore', 'asSubscribable']
, function (ko,_, asSubscribable) {

  function asGridable(observableArray,headerMap,rowMap) {
    asSubscribable.call(this);
    function formatHeader(h) { return h.replace(/_/g, " "); }
    this.headers = ko.pureComputed(function () {
      return _.chain(observableArray())
        .slice(0, 1)
        .map((headerMap || _.keys))
        .flatten()
        .map(formatHeader)
        .value();
    });
    this.rows = ko.pureComputed(function () {
      return observableArray().map(function (v) {
        return (rowMap || _.values)(v);
      });
    });
  }

  return asGridable;

});
