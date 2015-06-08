/// <reference path="json2.js" />
/// <reference path="jquery-1.10.2.min.js" />
/// <reference path="knockout.js" />
(function () {
  if (typeof define === 'function' && define.amd)
    define(["underscore", "kendoJayData", 'jquery.extentions.D'], factory);
  else factory(_);

  function factory(_) {
    function JayDataKendoExtentions() { }
    JayDataKendoExtentions.gridFactory = gridFactory;
    JayDataKendoExtentions.columnsFactory = makeKendoColumns;
    JayDataKendoExtentions.selectItems = selectItems;
    
    JayDataKendoExtentions.LookUpOptions = LookUpOptions;
    JayDataKendoExtentions.lookUpEditor = lookUpEditor;
    JayDataKendoExtentions.comboBoxEditor = comboBoxEditor;
    JayDataKendoExtentions.guidEditor = guidEditor;
    JayDataKendoExtentions.textAreaEditor = textAreaEditor;

    $.extend($data, {
      kendoEx: {
        gridFactory: gridFactory,
        columnsFactory: makeKendoColumns,
        selectItems: selectItems,
        LookUpOptions: LookUpOptions,
        lookUpEditor: lookUpEditor,
        comboBoxEditor: comboBoxEditor,
        guidEditor: guidEditor,
        textAreaEditor: textAreaEditor
      }
    });


    /// Grid ///
    function kendoError(event) {
      $.D.makeErrorDialog(event);
    }
    function guidEditor(container, options) {
      var valueField = options.field;
      var input = $('<input required data-type="guid" data-bind="value:' + valueField + '" />')
        .appendTo(container);
      if (!options.model[options.field])
        setTimeout(function () { input.val($data.createGuid() + '').change(); }, 1000);
    }
    function textAreaEditor(container, options) {
      var valueField = this;
      function grid() { return container.parents("table:eq(0)").parent().data().kendoGrid; }
      var s = $('<textarea required style="width:100%;min-width:10em" data-bind="value:' + valueField + '"></textarea>')
             .appendTo(container);
      setTimeout(function () { s.resizable(); }, 1000);
    }
    function LookUpOptions(options) {
      var lo = this;
      lo.emptyListMessage = "Empty.";
      lo.valueFieldDefault = undefined;
      lo.valueField = "ID";
      lo.textField = "Name";
      lo.filter = function (container, options) { return "it.ID == " + options.model.ID; }
      lo.lookUpText = "State";
      lo.lookUpValue = "StateID";
      lo.entitySet = {};
      lo.init = function (container, options) { }
      //delete lo.valueFieldDefault;
      $.extend(lo, options);
    }

    function dropDownEditor(container, options) {
      var lo = new LookUpOptions(this);
      // Lookup options
      lo.init(container, options);
      if (lo.valueFieldDefault !== undefined && options.model[lo.valueField] === null)
        options.model[lo.valueField] = lo.valueFieldDefault;
      var filter = lo.filter(container, options);
      var q = $.isFunction(lo.entitySet) ? lo.entitySet(container, options) : lo.entitySet;
      var dataSource = function () {
        if (filter) q = q.filter(filter);
        var ds = q.asKendoDataSource({ pageSize: 0 });
        return ds;
      }
      function grid() { return container.parents("table:eq(0)").parent().data().kendoGrid; }
      var s = $('<input required data-text-field="' + lo.lookUpText + '" data-value-field="' + lo.lookUpValue + '" style="" data-bind="value:' + lo.valueField + '"/>')
             .appendTo(container)
             .kendoDropDownList({
               change: function (a, b, c) {
                 var record = this._data()[this.selectedIndex];
                 var model = options.model;
                 model[lo.textField] = (record || {})[lo.lookUpText] || null;
                 if (record && options.model.innerInstance()[lo.valueField] !== record[lo.lookUpValue]) {
                   options.model.innerInstance()[lo.valueField] = record[lo.lookUpValue];
                   grid().dataSource.cancelChanges(model);
                   model.set(lo.valueField, record[lo.lookUpValue]);
                 }
               },
               filter: "contains",
               autobind: false,
               dataBound: function (a, b, c) {
                 if (this.dataSource.data().length) {
                   this.open();
                   //this.dataSource.data().unshift(defaultItem);
                 } else {
                   grid().cancelChanges();
                   $.D.fadingMessage(lo.emptyListMessage);
                 }
                 if ($UI && $UI.UserLayout)
                   $UI.UserLayout.resizeDropDown.call(this, a, { slack: 0 });
               },
               dataSource: dataSource()
             });
    }

    function comboBoxEditor(container, options) {
      var lo = new LookUpOptions(this);
      // Lookup options
      lo.init(container, options);
      if (lo.valueFieldDefault !== undefined && options.model[lo.valueField] === null)
        options.model[lo.valueField] = lo.valueFieldDefault;
      var filter = lo.filter(container, options);
      var q = $.isFunction(lo.entitySet) ? lo.entitySet(container, options) : lo.entitySet;
      var dataSource = function () {
        if (filter) q = q.filter(filter);
        var ds = q.asKendoDataSource({ pageSize: 0 });
        return ds;
      }
      function grid() { return container.parents("table:eq(0)").parent().data().kendoGrid; }
      var s = $('<input required data-text-field="' + lo.lookUpText + '" data-value-field="' + lo.lookUpValue + '" style="" data-bind="value:' + lo.valueField + '"/>')
             .appendTo(container)
             .kendoComboBox({
               change: function (a, b, c) {
                 var record = this._data()[this.selectedIndex];
                 var model = options.model;
                 model[lo.textField] = (record || {})[lo.lookUpText] || null;
                 if (record && options.model.innerInstance()[lo.valueField] !== record[lo.lookUpValue]) {
                   options.model.innerInstance()[lo.valueField] = record[lo.lookUpValue];
                   grid().dataSource.cancelChanges(model);
                   model.set(lo.valueField, record[lo.lookUpValue]);
                 }
               },
               filter: "contains",
               autobind: false,
               dataBound: function (a, b, c) {
                 if (this.dataSource.data().length) {
                   this.open();
                   //this.dataSource.data().unshift(defaultItem);
                 } else {
                   grid().cancelChanges();
                   $.D.fadingMessage(lo.emptyListMessage);
                 }
                 if ($UI && $UI.UserLayout)
                   $UI.UserLayout.resizeDropDown.call(this, a, { slack: 0 });
               },
               dataSource: dataSource()
             });
    }

    function lookUpEditor(lookUpParams, container, options) {
      var s = $('<select data-role="dropdownlist" style="margin:-10px;width:140%" data-bind="value:' + valueField + '">').appendTo(container);
      var entity = lookUpParams.entity;
      var valueField = lookUpParams.valueField;
      var filter = lookUpParams.filter(options);
      var lookUpText = lookUpParams.lookUpText;
      var lookUpValue = lookUpParams.lookUpValue;
      var dataSource = function () {
        var q = entity;
        if (filter) q = q.filter(filter);
        return q.asKendoDataSource();
      }
      s.kendoDropDownList({
        change: function (a, b, c) {
          var record = this._data()[this.selectedIndex];
          options.model.State = record[lookUpText];
        },
        autobind: false,
        suggest: false,
        placeholder: options.model.State,
        dataValueField: lookUpValue,
        dataTextField: lookUpText,
        dataBound: function () {
          if ($UI && $UI.UserLayout)
            $UI.UserLayout.resizeDropDown.call(this, a, { slack: 0 });
        },
        dataSource: dataSource()
      });
    }
    function dsOptionsDefault(columns, dataSource, runOnce) {
      return {
        filterable: defaultFIlterable(),
        sortable: true,
        pageable: true,
        //height: 500,
        columns: columns,
        editable: "inline",
        dataSource: dataSource,
        dataBound: _.once(runOnce || $.noop)
      }
    }
    function gridOptionsDefault() {
      return { scrollable: false }
    }
    function commandFieldFactory() {
      return {
        title: '<span class="k-icon k-edit" style="padding:0px;margin:0px"/><span class="k-icon k-delete"/>',
        command: [
        { name: "edit", text: { edit: "", update: "", cancel: "" }, width: 20 },
        { name: "destroy", text: "" }], width: 80
      };
    }
    function defaultFIlterable() {
      return {
        operators: {
          string: {
            contains: "Contains",
            eq: "Is equal to",
            neq: "Is not equal to",
            startswith: "Starts with",
            doesnotcontain: "Does not contain",
            endswith: "Ends with"
          }
        }
      }

    }
    function commandFieldFactoryDeleteOnly() {
      return {
        title: '<span class="k-icon k-delete"/>',
        command: [{ name: "destroy", text: "" }], width: 30
      };
    }
    var requestEnd = ko.observable();
    function gridFactory(element, entity, dataSourceOptions, gridOptions, success) {
      var requestEndLocal = ko.observable();
      dataSourceOptions = dataSourceOptions || {};
      var dsAfter = dataSourceOptions.after;
      if (dsAfter) delete dataSourceOptions.after;
      var reFilter = dataSourceOptions.reFilter;
      if (reFilter) delete dataSourceOptions.reFilter;
      gridOptions = gridOptions || {};
      var columns = (gridOptions || {}).columns;
      if (columns)
        delete gridOptions.columns;
      else if ($.isArray(gridOptions)) {
        columns = gridOptions;
        gridOptions = {};
      }
      if (success && typeof success == 'boolean')
        success = _.once(hideGrid);
      success = success || $.noop;
      var dsOptions = $.extend({ pageSize: 40, error: kendoError }, dataSourceOptions);
      var dataSource = $.extend(true, entity.asKendoDataSource(dsOptions), dsAfter);
      dataSource.bind("requestStart", onRequestStart);
      dataSource.bind("requestEnd", onRequestEnd);
      if (dsOptions.change)
        dataSource.bind("change", dsOptions.change);
      if (!columns || !columns.length || typeof columns[0] == "string")
        columns = makeKendoColumns(entity, columns);
      var editable = (gridOptions || {}).editable;
      var deleteonly = editable === 'deleteonly';
      if (typeof editable !== 'boolean') {
        if (deleteonly) gridOptions.editable = 'inline';
        var editColumn = deleteonly ? commandFieldFactoryDeleteOnly() : commandFieldFactory();
        columns.push(editColumn); //.unshift(editColumn);
      } else if ((gridOptions || {}).editable === 'deleteonly') {
        columns.push(commandFieldFactoryDeleteOnly());
      }
      var mustAutoSave = editable === true && gridOptions.autoSave;
      var smartPager = gridOptions.smartPager;
      var def = $.Deferred();
      function callback(e) {
        success(e);
        def.resolve(e);
      }
      var options = $.extend(dsOptionsDefault(columns, dataSource, callback), $.extend(gridOptionsDefault(), gridOptions));
      if (!deleteonly && !(options.toolbar === false) && options.editable !== false) options.toolbar = [{ name: "create", text: "Add" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }];

      if (options.hideHeader)
        $.map(options.columns, function (c) {
          $.extend(c, { headerAttributes: { style: "display: none" } });
        });

      var grid = $(element).kendoGrid(options);
      var kendoGrid = grid.data("kendoGrid");
      if (mustAutoSave) kendoGrid.bind("save", _.debounce(function () {
        var that = this;
        $.D.confirmedAction("Save?"
          , function () {
            that.dataSource.sync();
            that.dataSource.read();
          }
          , function () {
            entity.entityContext.stateManager.reset();
            that.dataSource.read();
          });
      }));
      if (smartPager)
        kendoGrid.bind("dataBound", function togglePager() {
          if (this.dataSource.totalPages() == 1)
            this.pager.element.hide();
          else this.pager.element.show();
        });
      return {
        grid: grid,
        kendoGrid: grid.data("kendoGrid"),
        promis: def,
        requestEnd: requestEnd,
        requestEndLocal: requestEndLocal
      };
      /// Locals ///
      var kendoLoader;
      function onRequestEnd(e) {
        //if (e.type == "destroy" && kendoLoader) {
        if (kendoLoader) {
          kendoLoader.fadeOut(1500, "swing", function () {
            $(this).remove();
          });
          kendoLoader = null;
        }
        if (e.type && ["read"].indexOf(e.type) < 0) {
          $.D.successMessage("Record was successfully " + e.type + "ed.");
          requestEnd({ type: e.type, entity: entity.name });
          requestEndLocal({ type: e.type, entity: entity.name });
        }
        //}
      }
      function onRequestStart(e) {
        var filters = (this.filter() || {}).filters || [];
        $.each(filters, function (i, filter) {
          var type = entity.elementType || entity.defaultType;
          if (type.getFieldNames().indexOf(filter.field) >= 0) {
            field = type.field.bind(type);
            var dataType = field(filter.field).memberDefinition.dataType;
            if (dataType.name == "Edm_Guid" || dataType == $data.Guid)
              try {
                if (!(filter.value instanceof $data.Guid))
                  filter.value = $data.parseGuid(filter.value);
              } catch (e) {
                alert("Value [" + filter.value + "] is not Guid.");
              }
          }
        });
        if (e.type && $.D)
          kendoLoader = $.D.loader.show((e.type || "Request ") + " is pending ...");
      }
    }
    var offsetMiliseconds = new Date().getTimezoneOffset() * 60000;
    function makeKendoColumns(entitySet, exclude, onKendoColumnCreated) {
      var options = $.isPlainObject(onKendoColumnCreated) ? onKendoColumnCreated : {};
      if (options === onKendoColumnCreated)
        onKendoColumnCreated = options.onKendoColumnCreated;
      var dateFormat = options.dateFormat || "MM/dd/yyyy";
      exclude = (exclude || []).concat([]);
      if (!_.isArray(exclude)) exclude = [exclude];

      var fields = [];
      exclude = $.map(exclude, function (v) {
        if (typeof v == 'string' && v.indexOf("$") === 0) {
          var name = v.replace("$", "");
          fields.push({ field: name, format: "{0:c}" });
          return name;
        }
        return v;
      });
      exclude = exclude.concat(fields);

      var columns = entitySet.asKendoColumns({ '$showComplexFields': true });
      if (onKendoColumnCreated) columns.forEach(onKendoColumnCreated);
      var roots = ["Root", "AssociatedRoot"];
      function notEmptyFilter(o) { return o && true };
      entitySet.defaultType.memberDefinitions.getPublicMappedProperties().forEach(function (pd) {
        var col = exclude.filter(function (c) {
          return c.field == pd.name;
        })[0] || _.find(columns, function (c) {
          return c.field == pd.name;
        });
        var metaType = (col.metaType || "").toLowerCase();
        if (metaType === "url" && !col.template)
          col.template = function (a, b) {
            var v = a[col.field];
            var u = $.D.parseMetaUrl(v);
            return v ? '<a href="' + u.href + '" target="_blank">' + u.label + '</a>' : "";
          }
        if (/*metaType === "text" && */!col.template) {
          col.template = function (a, b) {
            var v = a[col.field];
            var u = $.D.parseMetaUrl(v);
            if (v && u.href.indexOf("http://") == 0) {
              var stopProp = ($UI || {}).stopPropagation;
              var click = stopProp ? " onclick='$UI.stopPropagation()'" : "";
              return '<a href="' + u.href + '" target="_blank"' + click + '>' + u.label + '</a>';
            }
            return col.format ? kendo.toString(v, col.format) : v;
          }
        }
        if (pd.dataType == Date || pd.dataType.name == "DateTimeOffset" || pd.dataType.name == "JayDateTimeOffset") {
          //$.extend(col, { format: "{0:MM/dd/yyyy}" });
          var format = col.format || dateFormat;
          $.extend(col, {
            template: function (d) {
              var dt = d[pd.name];
              if ((dt || {}).setMinutes) {
                if (pd.dataType.name == 'Date')
                  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                return kendo.toString(dt, format);
              } else return "";
            }
          });
        }
        else if ($.inArray(pd.name, roots) >= 0) {
          $.extend(col, { template: function (data) { return makeRootLink(pd.name, data); } });
        }
      });
      var excludeNot = exclude[0] == "*";
      if (excludeNot) exclude.shift();
      _.chain(exclude).filter(function (field) { return _.isObject(field); }).each(function (field) {
        var f = _.find(columns, function (c) { return c.field == field.field; });
        if (f) $.extend(true, f, field);
      }).value();
      function include(indexOf) { return !excludeNot && indexOf < 0 || excludeNot && indexOf >= 0; }
      var columnsOut = $.map(columns, function (c, n) {
        var inArray = $.inArray(c.field, exclude.map(function (field) {
          return field.field || field;
        }));
        return include(inArray) ? c : null;
      });
      if (excludeNot)
        columnsOut = $.map(exclude, function (e, n) {
          var column = _.find(columnsOut, function (col) { return col.field == (e.field || e); });
          return column;
        });
      return columnsOut;
      /// Locals
      function makeRootLink(member, data) { return "<a href='" + location.pathname + "?root=" + data[member] + "'>" + data[member] + "</a>" }
    }

    function selectItems(grid, page, fieldValues, fieldName) {
      grid.dataSource.page(page);
      if (!$.isArray(fieldValues)) fieldValues = [fieldValues];
      var items = grid
        .items()
        .filter(function (i, el) {
          return fieldValues.indexOf(grid.dataItem(el)[fieldName]) !== -1;
        });
      grid.select(items);
    }


    function hideGrid(e) { e.sender.element.hide("fast"); }

    return JayDataKendoExtentions;
  }
})();