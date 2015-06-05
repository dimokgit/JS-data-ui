/// <reference path="../bower_modules/knockout/dist/knockout.js" />
define("ko", ["knockout"], function (ko) { return ko; });
define(['knockout', 'promise-monad', 'JayData.kendo.extensions','JayData', 'kendoJayData', 'koJayData', 'Northwind','jquery.extentions.D', 'ko.extensions'], function (ko, PM, JKE) {
  function VM(dbContext) {
    this.customers = ko.pureComputed(function () {
      return JSON.stringify(customers(), null, 2);
    });
    this.startTest = function (element) {
      var columns = JKE.columnsFactory(dbContext.Customers, ["*","CompanyName","Address","City"]);
      JKE.gridFactory(element, dbContext.Customers,
        { pageSize: 20 },
        {
          columns: columns,
          editable: false,
          filterable: false,
          pageable: { refresh: true }
        });
    };
  }

  // init - load app
  new PM(defineDashboardDB, startApp).pump()
  .fail(function (e) {
    alert(JSON.stringify(e, null, 2));
  });

  function defineDashboardDB() {
    var p = $.Deferred();
    var db = new ODataWebV3.Northwind.Model.NorthwindEntities({ name: 'oData', oDataServiceHost: "http://services.odata.org/V3/Northwind/Northwind.svc", enableJSONP: true });
    db.onReady(p.resolve.bind(p, db));
    return p;
  }
  function startApp(DB) {
    ko.applyBindings(new VM(DB));
  }
});;