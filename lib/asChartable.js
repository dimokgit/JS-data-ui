define('asChartable', ['jquery', 'underscore', 'asSubscribable'], function ($, _, asSubscribable) {
  function asChartable() {
    asSubscribable.call(this);
    var chartElement;
    var getChart = this.getChart = function getChart() { return $(chartElement).data("kendoChart"); }
    this.initChart = function initChart(element) {
      return chartElement = element;
    }
    var super_dispose = this.dispose.bind(this);
    this.dispose = function dispose() {
      super_dispose();
      var chart = getChart();
      if (chart) {
        chart.dataSource.data([]);
        _.chain([chart.options.series])
          .flatten(true)
          .each(cleanSeries)
          .value();
        chart.destroy();
      }
      $(chartElement).empty();
      function cleanSeries(s) { s.data = []; }
    };
    return this;
  }
  return asChartable;
});
define("addMixin", [], function () {
  if (typeof Object.prototype.addMixin !== 'function') {
    Object.defineProperty(Object.prototype, 'addMixin', {
      value: function addMixin(mixin) {
        mixin.call(this.prototype);
      },
      configurable: true,
      writable: true
    });
    Function.prototype.curry = function () {
      var fn = this;
      var args = [].slice.call(arguments, 0);
      return function () {
        return fn.apply(this, args.concat([].slice.call(arguments, 0)));
      };
    }
  }
});
(function () {
  var Foo = {
    init: function(who) {
      this.me = who;
    },
    identify: function() {
      return "I am " + this.me;
    }
  };

  var Bar = Object.create(Foo);

  Bar.speak = function() {
    alert("Hello, " + this.identify() + ".");
  };

  var b1 = Object.create(Bar);
  b1.init("b1");
  var b2 = Object.create(Bar);
  b2.init("b2");

  b1.speak(); // alerts: "Hello, I am b1."
  b2.speak(); // alerts: "Hello, I am b2."});