/* jshint laxcomma:true*/
define('asChartable', ['jquery', 'underscore', 'asSubscribable'], function ($, _, asSubscribable) {
  function asChartable() {
    asSubscribable.call(this);
    var chartElement;
    var getChart = this.getChart = function getChart() { return $(chartElement).data("kendoChart"); };
    this.initChart = function initChart(init, element) {
      chartElement = element;
      if (init) init(element);
    };
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
