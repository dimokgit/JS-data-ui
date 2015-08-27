define(['knockout', 'underscore', 'asGridable'], function (ko, _, asGridable) {
  function GridableChild(data,headerMap,rowMap) {
    var self = asGridable.call(this, data, headerMap, rowMap);
  }

  var data = ko.observableArray([{ col1: 'a', col2: 'b' }]);

  describe('asGridable test', function () {
    var sc = new GridableChild(data);
    it('should have headers', function () {
      expect(sc.headers()).toEqual(["col1", "col2"]);
    });
    it('should have rows', function () {
      expect(sc.rows()).toEqual([["a", "b"]]);
    });
  });
  describe('asGridable test with custom map', function () {
    function headerMap(h) { return _.map(h,function (v, n) { return n.toUpperCase(); }); }
    var sc = new GridableChild(data, headerMap, rowMap);
    it('should have headers', function () {
      expect(sc.headers()).toEqual(["COL1", "COL2"]);
    });
    function rowMap(h) { return _.map(h, function (v) { return v.toUpperCase(); }); }
    it('should have rows', function () {
      expect(sc.rows()).toEqual([["A", "B"]]);
    });
  });

});
