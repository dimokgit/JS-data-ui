define(['jquery', 'underscore', 'asChartable'], function ($, _, asChartable) {
  function ChartableChild() {
    var self = asChartable.call(this);
    this.initChart = this.initChart.bind(this, createChart);
    this.chartElement = null;
    function createChart(element) {
      self.chartElement = element;
      element.text("chart");
    }
  }

  describe('asChartable test', function () {

    var sc = new ChartableChild();
    it('should initChart and dispose it', function () {
      var element = $("<div>html</div>");
      expect(element).toBeDefined();
      sc.initChart(element);
      expect(sc.chartElement).not.toBeNull();
      expect($(sc.chartElement).text()).toEqual("chart");
      sc.dispose();
      expect($(sc.chartElement).text()).toEqual("");
    });
    //it('should subscribe', function () {
    //  expect(sc.subscribe(ko.observable()).length).toEqual(2);
    //});
    //it('should unsubscribe', function () {
    //  expect(sc.dispose().length).toEqual(0);
    //});

  });

});
