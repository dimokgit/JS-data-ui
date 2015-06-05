/// <reference path="../../Scripts/jquery-2.0.3.js" />
/// <reference path="../../Scripts/jaydata-1.3.4/jaydata.js" />
/// <reference path="../../Scripts/JayData.kendo.extentions.js" />
/// <reference path="../../Scripts/underscore-min.js" />
/// <reference path="../../Scripts/jquery.extentions.D.js" />

(function () {
  if (typeof define === 'function' && define.amd)
    define(["jquery", "jquery.extentions.D", "JayData.kendo.extentions"], function ($) { factory($); })
  else factory($);

  function factory($) {
    $.fn.extend({
      itau: function () {
        var that = this;
        return {
          dbObject: function (entitySet, options, success, div, me) {
            return dbObject(entitySet, options, that, success, div, me);
            return that;
          },
          buildFieldset: function (header) { return buildFieldset(that, header); }
        };
      }
    });

    function buildFieldset(container, header) {
      var div = $("<div/>"); //.css("display", "none");
      $("<fieldset>").addClass("toggle").append($("<legend>" + header + "</legend>"), div).appendTo(container);
      return div;
    }
    function buildUI(container, entitySet, header, showDefinition) {
      var headerRaw = entitySet.name || entitySet.defaultType.name;
      var nameSpace = headerRaw.split("__")[1];
      var objectName = headerRaw.split("__")[0];
      var objectFullName = nameSpace + '.' + objectName;
      var parts = headerRaw.split("__")[0].split("_");
      var header = header || _.chain(parts).map(function (part) { return $.D.toWords(part); }).value().join(" -> ");

      var div = $("<div/>"); //.css("display", "none");
      var img = $("<img src='" + __BASE_URL__("images/File-New.png") + "' title='Show Definition'>").click(showDefinition(entitySet.entityContext, objectFullName));
      $("<fieldset>").addClass("toggle").append($("<legend title='" + headerRaw + "'>" + header + " {" + nameSpace + "} </legend>").append(img), div).appendTo(container);
      return div;
    }
    function dbObject(entitySet, options, container, success, div, me) {
      options = options || {};
      if (!container) return alert("dbObject: container parameter is empty");
      container = $(container);
      if (container.length == 0) return alert("dbObject: " + container.selector + " container is not found.");
      div = div || buildUI(container, entitySet, (options.UI || {}).header, showDefinition);

      var gridOptions = kendoGridOptions(options.grid);
      var dataSourceOptions = $.extend(true, { pageSize: gridOptions.pageable ? gridOptions.pageable.pageSize || 10 : 0 }, options.ds);
      if (ko.isComputed(dataSourceOptions.filter)) {
        dataSourceOptions.filter.subscribe(filterChanged);
        dataSourceOptions.filter = dataSourceOptions.filter();
      } 
      var ret = $data.kendoEx.gridFactory(div, entitySet, dataSourceOptions, gridOptions, success);
      function filterChanged(filter) { ret.grid.data().kendoGrid.dataSource.filter(filter); }
      if (me) {
        me.requestEnd = $.D.sure(ret, "requestEnd");
        me.onRequestEnd(div);
      }
      return div;
      // Locals
      function kendoGridOptions(options) {
        var kgo = {
          editable: false,//'inline',
          resizable: true,
          //filterable: true,
          sortable: true,//{ mode: "multiple" },
          pageable: {
            pageSizes: [10, 25, 50, 100, 250, 0],
            numeric: false,
            messages: {
              display: "{0}-{1} of {2}",
              itemsPerPage: ""
            }
          },
          scrollable: false
        };
        return $.extend(true,kgo, options);
      }
      function showDefinition(context, view) {
        return function (e) {
          $UI.stopPropagation(e);
          var viewSql, triggersSql = '';
          var def1 = context.vText__Help.filter(function (f) { return f.View == this.view; }, { view: view }).forEach(
          function (view) {
            viewSql = $.trim(view.Sql);
          });
          var def2 = context.vTriggerText__Help.filter(function (f) { return f.ParentName == this.view; }, { view: view }).forEach(
          function (view) {
            triggersSql += "\n********************** " + view.TriggerName + "  **********************\n" + $.trim(view.Sql);
          });
          $.when(def1, def2).then(function () {
            if (triggersSql) $.D.makeErrorDialog(triggersSql, { title: view + "'s triggers" });
            if (viewSql) $.D.makeErrorDialog(viewSql, { title: view });
            if (!(triggersSql || viewSql))
              $.D.makeErrorDialog("There is nothing to see if it's a table without any triggers.", { title: view });
          });
        }
      }
    }

  }
})();