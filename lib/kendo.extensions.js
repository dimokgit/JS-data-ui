(function () {
  if (typeof define === 'function' && define.amd)
    define(["jquery",'jquery.extentions.D'], factory);
  else factory($);

  function factory($) {
    function kendoLabels(options) { return $.extend(true, { color: "gray", font: $.D.kendo.charts.font(0, true), margin: 0 }, options); }
    function pieOptions(categoryValues, options) {
      var r = $.extend(true, {
        legend: {
          visible: true,
          position: "right",
          labels: kendoLabels({
            template: "#= text # - #= kendo.format('{0:P1}', value)#"
          })
        }, seriesDefaults: {
          labels: kendoLabels({
            visible: false,
            template: ((options || {}).showCategoryInLable ? "#= category # - " : "") + "#= kendo.format('{0:P1}', percentage)#"
          })
        }, series: [{
          type: "pie",
          data: categoryValues
        }],
        tooltip: { visible: true, template: "#= category # - #= kendo.format('{0:P1}', percentage)#" }

      }, options);
      return r;
    }
    function disposeChart(chartElement) {
      var chart = $(chartElement).data("kendoChart");
      if (chart) {
        chart.dataSource.data([]);
        chart.destroy();
        _.chain([chart.options.series])
          .flatten(true)
          .each(cleanSeries)
          .value();
      }
      $(chartElement).empty();
      function cleanSeries(s) { s.data = []; }
    }
    return {
      chart: {
        pieOptions: pieOptions,
        font: function (size, bold) { return (bold ? "bold" : "") + " " + (size || 12) + "px  Arial,Helvetica,sans-serif"; },
        series: function (type, data, options) { return $.extend(true, { type: type, data: data }, options); },
        categories: function (baseUnit, categories, options) { return $.extend(true, { baseUnit: baseUnit, categories: categories }, options); },
        title: function (text, options) { return $.extend(true, { text: text, padding: 0, margin: 0, font: "bold 12px Arial", position: "top" }, options); },
        dispose: disposeChart
      }
    };
  }
})();