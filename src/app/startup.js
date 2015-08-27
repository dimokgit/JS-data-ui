/// <reference path="../bower_modules/knockout/dist/knockout.js" />
define("startup",['knockout', 'promise-monad', 'JayData.kendo.extensions', 'JayData', 'kendoJayData', 'koJayData', 'Northwind', 'ko.extensions']
, function (ko, PM, JKE) {
  //define("ko", ["knockout"], function (ko) { return ko; });
  function VM(dbContext) {
    this.customers = ko.pureComputed(function () {
      return JSON.stringify(customers(), null, 2);
    });
    this.startTest = function (element) {
      var columns = JKE.columnsFactory(dbContext.Customers, ["*", "CompanyName", "Address", "City"]);
      var gridContext = JKE.gridFactory(element, dbContext.Customers,
        {
          serverPaging: new Boolean(true),
          pageSize: 20
        },
        {
          smartPager: true,
          columns: columns,
          editable: false,
          //filterable: true,
          pageable: {
            refresh: true,
            buttonCount: 3
          }
        });
      gridContext.kendoGrid.bind("dataBound", togglePager);
      /// Locals
      function togglePager() {
      }
    };
  }
  debugger;
  // init - load app
  return new PM(defineDashboardDB, startApp).pump()
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
    var vm = new VM(DB);
    ko.applyBindings(vm);
    return vm;
  }
});