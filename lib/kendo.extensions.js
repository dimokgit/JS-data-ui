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

    function line2Columns(lineValues, columnValues, columnValues2, legend, categories, options) {
      if (!$.isArray(legend) || legend.length != 3) return alert("Parameter legend must be an array of 3 names");
      return $.extend(true, {
        theme: "default"
        , legend: {
          labels: kendoLabels(),
          visible: true,
          position: "bottom"
        }, series: [
        {
          name: legend[0],
          type: "line",
          data: lineValues,
          axis: "value",
          tooltip: { visible: true, template: "#= '" + legend[0] + "<br/>'+kendo.toString(parseFloat(value), 'n0') #" }
        }, {
          name: legend[1],
          type: "column",
          data: columnValues,
          axis: "volume",
          tooltip: { visible: true, format: legend[1] + ": {0:N0}" }
        }, {
          name: legend[2],
          type: "column",
          data: columnValues2,
          axis: "volume",
          tooltip: { visible: true, format: legend[2] + ": {0:N0}" }
        }
        ], valueAxis: [
          { labels: kendoLabels({ "format": "N0" }), name: "volume", line: { visble: true} },
          { labels: kendoLabels({ "format": "N0" }), name: "value", line: { visble: true} }
        ],
        categoryAxis: {
          line: { visible: true },
          majorGridLines: {
            // hide the major grid lines
            visible: true
          },
          categories: categories,
          axisCrossingValue: [0, 1000],
          labels: kendoLabels({ "rotation": 20 })
        }
      }, options);
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
        line2Columns: line2Columns,
        font: function (size, bold) { return (bold ? "bold" : "") + " " + (size || 12) + "px  Arial,Helvetica,sans-serif"; },
        series: function (type, data, options) { return $.extend(true, { type: type, data: data }, options); },
        categories: function (baseUnit, categories, options) { return $.extend(true, { baseUnit: baseUnit, categories: categories }, options); },
        title: function (text, options) { return $.extend(true, { text: text, padding: 0, margin: 0, font: "bold 12px Arial", position: "top" }, options); },
        dispose: disposeChart
      }
    };
  }
})();