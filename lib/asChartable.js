define('asChartable', ['jquery', 'underscore', 'asSubscribable'], function ($, _, S) {
  function asChartable() {
    S.call(this);
    var chartElement;
    this.initChart = function initChart(element) {
      return chartElement = element;
    }
    var super_dispose = this.dispose.bind(this);
    this.dispose = function dispose() {
      super_dispose();
      var chart = $(chartElement).data("kendoChart");
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
