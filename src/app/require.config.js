/// <reference path="../js/kendo-2015.1.429/js/kendo.all.min.js" />
/// <reference path="../js/Northwind.js" />
/// <reference path="JayData.kendo.extentions.js" />
/// <reference path="JayData.kendo.extensions.js" />
/// <reference path="../bower_modules/jquery.extentions/lib/ko.extensions.js" />
/// <reference path="../bower_modules/underscore/underscore-min.js" />
/// <reference path="../bower_modules/jquery.extentions/lib/jquery.extentions.D.js" />
// require.js looks for the following global when initializing
var require = {
  baseUrl: ".",
  paths: {
    "jquery": "bower_modules/jquery/dist/jquery",
    "jquery-ui": "bower_modules/jquery-ui/jquery-ui",
    "knockout": "bower_modules/knockout/dist/knockout",
    "underscore":"bower_modules/underscore/underscore-min",
    "JSON.prune": "bower_modules/JSON.prune/JSON.prune",

    "datajs": "js/datajs-1.1.3",
    "OData": "js/datajs-1.1.3",

    "kendo": "js/kendo-2015.1.429/js/kendo.all.min",

    "JayData": "bower_modules/JayData/jaydata-1.3.5/jaydata",
    "oJayData": "bower_modules/JayData/jaydata-1.3.5/jaydataproviders/oDataProvider",
    "kendoJayData": "bower_modules/JayData/jaydata-1.3.5/jaydatamodules/kendo-patch121",
    "koJayData": "bower_modules/JayData/jaydata-1.3.5/jaydatamodules/knockout",
    "JayData.kendo.extensions": "app/JayData.kendo.extensions",

    "jquery.extentions.fn": "bower_modules/jquery.extentions/lib/jquery.extentions.fn",
    "jquery.extentions.Linq": "bower_modules/jquery.extentions/lib/jquery.extentions.Linq",
    "jquery.extentions.D": "bower_modules/jquery.extentions/lib/jquery.extentions.D",

    "Northwind": "js/Northwind",
    "ko.extensions": "bower_modules/jquery.extentions/lib/ko.extensions",

    "promise-monad": "bower_modules/monads/lib/promise-monad"
  },
  shim: {
    "knockout": {
      init: function (ko) {
        debugger;
      }
    },
    "kendo": ["jquery"],
    "JayData": {
      deps: ["OData", "knockout"], init: function (OData, ko) {
        window.OData = OData;
        window.ko = ko;
      }
    },
    "oJayData": ["OData", "JayData"],
    "kendoJayData": ["oJayData", "kendo"],
    "koJayData": ["JayData"],
    "Northwind": ["kendoJayData"]
  }
};
