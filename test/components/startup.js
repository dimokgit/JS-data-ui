define(['jquery','knockout', 'promise-monad', 'JayData.kendo.extensions','startup', 'JayData', 'kendoJayData', 'koJayData', 'Northwind', 'ko.extensions'], function ($,ko, PM, JKE,startup) {
  describe('startup test', function () {
    startup.done(function (vm) {
      if($("html title").text().indexOf("DEBUG")<0) return;
      var element = $("body").append("<div/>");
      vm.startTest(element);
      //it('should fail', function () {
      //  fail("Just fail test");
      //});
    });
  });

});
