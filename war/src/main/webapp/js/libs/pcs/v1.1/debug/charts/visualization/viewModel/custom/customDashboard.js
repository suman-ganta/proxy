/**
 * Created by nisabhar on 11/19/2015.
 */

define(['ojs/ojcore', 'knockout', 'pcs/charts/visualization/viewModel/util/visualizationUtil', 'pcs/charts/visualization/viewModel/services/DataServices', 'ojs/ojradioset', 'ojs/ojdialog',
	'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojdatetimepicker', 'ojs/ojtable', 'ojL10n!pcs/resources/nls/dashboardResource',
	'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojdatacollection-common'], function (oj, ko, util, services) {
	/**
	 * The view model for the main content view template
	 */
	function customDashboardContainerModel(params) {

		var self = this;
		self.oj = oj;

		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of dashboardContainer
		services.setAuthInfo(self.parent.authInfo); // Login credentials
		services.setBaseRestURL(self.parent.baseRestUrl);
		self.rootElement = this.parent.rootElement;
		self.processList = ko.observableArray([]);
		self.columnDataList = ko.observableArray(['']);
		self.columnDataBIList = ko.observableArray(['']);
		self.measureList = ko.observableArray([{name: '', displayName: ''}]);
		self.measureBIList = ko.observableArray([{name: '', displayName: ''}]);
		self.dimensionList = ko.observableArray([{name: '', displayName: ''}]);
		self.dimensionBIList = ko.observableArray([{name: '', displayName: ''}]);
		self.attributeList = ko.observableArray([]);
		self.filterCriteriaList = ko.observableArray([]);
		self.functionList = ko.observableArray([{name: '', displayName: ''}]);
		self.allFunctionArr = [];

		self.chartTypeList = [
			{
				name: util.constants.chartType.BAR,
				displayName: self.bundle.vis.button.bar,
				icon: 'oj-fwk-icon btn-bar-chart'
			},
			{
				name: util.constants.chartType.LINE,
				displayName: self.bundle.vis.button.line,
				icon: 'oj-fwk-icon btn-line-chart'
			},
			{
				name: util.constants.chartType.AREA,
				displayName: self.bundle.vis.button.area,
				icon: 'oj-fwk-icon btn-area-chart'
			},
			{
				name: util.constants.chartType.LINEWITHAREA,
				displayName: self.bundle.vis.button.line_with_area,
				icon: 'oj-fwk-icon btn-linewitharea-chart'
			},
			{
				name: util.constants.chartType.COMBO,
				displayName: self.bundle.vis.button.combo,
				icon: 'oj-fwk-icon btn-combo-chart'
			}
		];

		//Create select data for Time Group field
		self.timeGroups = util.constants.timeGroups.map(function (item) {
			return {
				id: item,
				label: self.bundle.vis.timeGroups[item]
			};
		});
		//Set default value for Time Group field
		self.selectedSrsTimeGroup = ko.observableArray([]);
		self.selectedGrpTimeGroup = ko.observableArray([]);

		self.selectedVisualizationName = ko.observable('');
		self.selectedDataSource = ko.observableArray(['']);
		self.selectedProcess = ko.observableArray([util.constants.misc.ANY]);
		self.selectedSeries = ko.observableArray(['']);
		self.selectedGroup = ko.observableArray(['']);
		self.selectedMeasure = ko.observableArray(['']);
		self.selectedFunction = ko.observableArray(['']);
		self.selectedFilterType = ko.observable(util.constants.misc.ALL);
		self.selectedAppName = ko.observableArray([util.constants.misc.ANY]);
		self.measureDisabled = ko.observable(false);
		self.queryName = ko.observable('');
		self.description = ko.observable('');
		self.savedQueries = ko.observableArray([]);
		self.queriesDS = new oj.ArrayTableDataSource(self.savedQueries, {idAttribute: "id"});
		self.selectedQuery = ko.observableArray([]);
		self.selectedQueryJSON = null;
		self.dataSourceList = ko.observableArray([{name: '', displayName: ''}]);
		//define appNameList variable
		self.appNameList = ko.observableArray(['']);
		self.formState = 'new';
		self.lastNDaysFilter = loadLastNDaysFilter();
		self.selectedLastDays = ko.observableArray(['30']);


		initialize();
		//initialize and fetch data for the view
		function initialize() {
			loadSavedQueries();
			loadFormData();
		}

		function loadFormData() {
			services.getDataSourceList().done(
				function (data) {
					util.refreshAll(self.dataSourceList, formDSData(data));
					self.selectedDataSource([self.dataSourceList()[0].name]);
					//loggerUtil.log("datasource list " +ko.toJSON(self.dataSourceList()[0]));
					loadFunctionList();
					loadAppList();
				}
			);
		}

		function formDSData(data) {
			return data.map(function (item) {
				return {name: item, displayName: self.bundle.vis.datasource[item]};
			});
		}

		// Function to determine display of Time Group field
		function displayTimeGroup(data, field) {
			var filterCondition = function (item) {
				return item.name === data.value[0];
			};
			if (data.option == util.constants.misc.VALUE) {
				var selectedItem = self.dimensionList().filter(filterCondition);
				selectedItem = selectedItem.length === 0 ? self.dimensionBIList().filter(filterCondition) : selectedItem;
				if (selectedItem.length > 0 && selectedItem[0].dataType === util.constants.dataType.DATETIME) {
					$('#bpm-vis-' + field + '-timegroups').show();
				}
				else {
					$('#bpm-vis-' + field + '-timegroups').hide();
					if (field === 'srs') {
						self.selectedSrsTimeGroup([]);
					} else if (field === 'grp') {
						self.selectedGrpTimeGroup([]);
					}
				}
			}
		}

		function loadFunctionList() {
			services.getAggregateOperations().done(
				function (data) {
					self.allFunctionArr = data;
					util.refreshAll(self.functionList, formFunctionData(data));
					self.selectedFunction([self.functionList()[0].name]);
					//loggerUtil.log("getAggregateOperations " +ko.toJSON(data));
					// Remove overlays for loading
				}
			);
		}

		function formFunctionData(data) {
			var arr = data.map(function (item) {
				return {name: item, displayName: self.bundle.vis.functions[item]};
			});
			return arr;
		}

		// On change of Measure update the corresponding Aggregation or Function List
		function refreshAggregations(item, selectedValue) {
			if (item.name === selectedValue) {
				var functionObjData;
				if (item.supportedAggregations && item.supportedAggregations.length > 0) {
					functionObjData = formFunctionData(item.supportedAggregations);
					self.selectedFunction([functionObjData[0].name]);
				} else {
					functionObjData = formFunctionData(self.allFunctionArr);
				}
				util.refreshAll(self.functionList, functionObjData);
			}
		}


		function formatData(rows) {
			if (rows) {
				rows = rows.map(function (item) {
					return {'name': item.values[0], 'displayName': item.values[1]};
				});
			}
			return rows;
		}

		function loadAppList() {
			//trigger service to fetch data for appNameList
			services.getAppNameList().done(
				function (data) {
					util.refreshAll(self.appNameList, formatData(data.rows));
					self.selectedAppName([util.constants.misc.ANY]);
				}
			);
		}


		function loadColumnData(dataSource, appName) {
			var params;
			if (appName == util.constants.misc.ANY) {
				params = {'{dataSource}': dataSource, '{appName}': ''};
			} else {
				//params to fetch data for selected app name
				params = {'{dataSource}': dataSource, '{appName}': appName};
			}

			services.getColumnListByApp(params).done(
				function (response) {
					populateColumnData(response);
					//loggerUtil.log(ko.toJSON(data));
					// Remove overlays for loading
					$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
				}
			);
		}

		function populateColumnData(data) {
			var attributeArr = [];
			var dimensionArr = [];
			var dimensionBIArr = [];
			var measureArr = [];
			var measureBIArr = [];
			var allChartAttribs = [];
			var allChartBIAttribs = [];
			data.map(
				function (item) {
					switch (item.type) {
						case util.constants.columnTypes.ATTRIBUTE:
							updateList(attributeArr, item);
							break;
						case util.constants.columnTypes.DIMENSION:
							if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
								updateList(dimensionBIArr, item);
							} else {
								updateList(dimensionArr, item);
							}
							break;
						case util.constants.columnTypes.MEASURE:
							if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
								updateList(measureBIArr, item);
							} else {
								updateList(measureArr, item);
							}
							break;
						default :
							loggerUtil.log('missing type info' + ko.toJSON(item));

					}
					if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
						updateList(allChartBIAttribs, item);
					} else {
						updateList(allChartAttribs, item);
					}

				}
			);
			util.refreshAll(self.columnDataList, allChartAttribs);
			util.refreshAll(self.columnDataBIList, allChartBIAttribs);
			util.refreshAll(self.measureList, measureArr);
			util.refreshAll(self.measureBIList, measureBIArr);
			util.refreshAll(self.dimensionList, dimensionArr);
			util.refreshAll(self.dimensionBIList, dimensionBIArr);
			util.refreshAll(self.attributeList, attributeArr);
			setSelectBoxValues();
		}

		//Set the select box selection values based of state
		function setSelectBoxValues() {
			if (self.formState === 'reload' && self.selectedQueryJSON) {
				var selectedSrs = self.selectedQueryJSON.legend;
				self.selectedSeries([selectedSrs]);
				var selectedGrp = self.selectedQueryJSON.groups[0];
				self.selectedGroup([selectedGrp]);
				self.selectedFunction([self.selectedQueryJSON.dataSeries[0].aggregateOperation]);
				self.selectedMeasure([self.selectedQueryJSON.dataSeries[0].measureColumn]);
				if (self.selectedQueryJSON.lastNDays) {
					self.selectedLastDays([self.selectedQueryJSON.lastNDays.toString()]);
				}
				if (self.selectedQueryJSON.timeGroupings) {
					if (self.selectedQueryJSON.timeGroupings[selectedSrs]) {
						self.selectedSrsTimeGroup([self.selectedQueryJSON.timeGroupings[selectedSrs].timeGroupingUnits[0]]);
					}

					if (self.selectedQueryJSON.timeGroupings[selectedGrp]) {
						self.selectedGrpTimeGroup([self.selectedQueryJSON.timeGroupings[selectedGrp].timeGroupingUnits[0]]);
					}
				}
				if (self.selectedQueryJSON.filter) {
					self.selectedFilterType(self.selectedQueryJSON.filter.filterType);
					var filters = [];
					self.selectedQueryJSON.filter.filterEntries.map(function (item) {
						var filter = new FilterModel();
						filter.columnDataValue([item.columnName]);
						filter.operatorValue([item.operator]);
						filter.dataType(item.columnDataType);
						filters.push(filter);
					});
					util.refreshAll(self.filterCriteriaList, filters);
					self.selectedQueryJSON.filter.filterEntries.map(function (entry) {
						self.filterCriteriaList().map(function (criteria) {
							if (entry.columnName === criteria.columnDataValue()[0]) {
								if (criteria.dataType() === util.constants.dataType.DATETIME && entry.value && entry.value !== '') {
									var date = new Date(parseInt(entry.value));
									var iso = self.oj.IntlConverterUtils.dateToLocalIso(date);
									criteria.selectedValue(iso);
								} else {
									criteria.selectedValue(entry.value);
								}
							}
						});
					});
				}
				if (self.selectedQueryJSON.properties) {
					self.selectedQueryJSON.properties.map(function (item) {
						if (item.name && item.name === 'chartType') {
							self.selectedChartType(item.value ? item.value : util.constants.chartType.BAR);
						}
					});
				} else {
					self.selectedChartType(util.constants.chartType.BAR);
				}
			} else if (self.formState === 'new') {
				self.selectedFilterType(util.constants.misc.ALL);
				self.selectedLastDays(['30']);
				self.selectedSeries([self.dimensionList()[0].name]);
				self.selectedGroup([self.dimensionList()[1].name]);
				if (self.selectedFunction()[0] !== util.constants.functionList.COUNT) {
					self.selectedMeasure([self.measureList()[0].name]);
				}
			}
		}

		//function to create data object for option item
		var updateList = function (arr, item) {
			arr.push({
				name: item.name,
				displayName: item.displayName,
				dataType: item.dataType,
				supportedAggregations: item.supportedAggregations
			});
		};

		function loadChartData(oj, payload) {
			//self.load(query,self.populateChartData);
			var payloadData = payload ? payload : getPayloadForChartData(oj);
			self.groupKey = payloadData.groups[0];
			self.seriesKey = payloadData.legend;
			//If Count is selected then replace with X as backend passes same
			var measrClmn = payloadData.dataSeries[0].measureColumn === '*' ? 'X' : payloadData.dataSeries[0].measureColumn;
			self.measureKey = payloadData.dataSeries[0].aggregateOperation + measrClmn;

			//Call the rest service to fetch chart data
			services.getChartData(JSON.stringify(payloadData)).done(
				function (data) {
					self.populateChartData(data);
				}
			).fail(
				function () {
					$('#bpm-vis-cust-chart-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
					util.errorHandler('', self.bundle.vis.error_msg.data_fetch_error);
				}
			);
		}

		function getPayloadForChartData(oj) {
			var filtersObj = {filterType: self.selectedFilterType(), filterEntries: []};
			self.filterCriteriaList().map(function (item) {
				var value = item.selectedValue() instanceof Array ? item.selectedValue()[0] : item.selectedValue();
				var dataType = item.dataType();
				//Date to be in long format as per Service requirements
				if (dataType === util.constants.dataType.DATETIME && value && value !== '') {
					value = oj.IntlConverterUtils.isoToLocalDate(value).getTime();
				} else if (dataType === util.constants.dataType.INT && value !== '') {
					value = parseInt(value);
				}

				filtersObj.filterEntries.push({
					'columnName': item.columnDataValue()[0],
					'operator': item.operatorValue()[0],
					'value': value,
					'columnDataType': dataType
				});
			});

			var obj = {
				'id': self.selectedQueryJSON ? self.selectedQueryJSON.id : '',
				'title': self.queryName(),
				'description': self.description(),
				'dataSource': self.selectedDataSource()[0],
				'applicationName': self.selectedAppName()[0] === util.constants.misc.ANY ? null : self.selectedAppName()[0],
				'queryType': 'GROUP',
				'dataSeries': [{
					measureColumn: self.selectedMeasure()[0],
					aggregateOperation: self.selectedFunction()[0]
				}],
				'groups': [self.selectedGroup()[0] === util.constants.misc.ANY ? '*' : self.selectedGroup()[0]],
				'legend': self.selectedSeries()[0] === util.constants.misc.ANY ? '*' : self.selectedSeries()[0],
				'filter': filtersObj,
				'topN': null,
				'sortEntries': null,
				'lastNDays': self.selectedLastDays()[0],
				'properties': [{'name': 'chartType', 'value': self.selectedChartType()}]
			};
			obj.timeGroupings = {};
			//add time group section if a time group was selected
			if (self.selectedSrsTimeGroup().length > 0) {
				obj.timeGroupings[self.selectedSeries()[0]] = {
					"timeGroupingUnits": [self.selectedSrsTimeGroup()[0]]
				}
			}
			if (self.selectedGrpTimeGroup().length > 0) {
				obj.timeGroupings[self.selectedGroup()[0]] = {
					"timeGroupingUnits": [self.selectedGrpTimeGroup()[0]]
				}
			}
			//loggerUtil.log("Payload data : "+ko.toJSON(obj));
			return obj;
		}

		/*
		 Extract data returned from the rest api, massage it as per Graph data format
		 and update the graph data objects
		 */
		self.populateChartData = function (data) {
			self.groupsArray = [];
			self.seriesArray = [];
			var options = {formatType: 'date', pattern: 'M/d/y h:mm'};
			var converter = self.oj.Validation.converterFactory("datetime").createConverter(options);
			//get the index of Group, series and measure data from columnsInfo
			data.columnsInfo.map(function (item, index) {
				if (item.columnName.indexOf(self.groupKey) >= 0) {
					self.groupIndex = index;
					self.groupType = item.type;
				} else if (item.columnName.indexOf(self.seriesKey) >= 0) {
					self.seriesIndex = index;
					self.seriesType = item.type;
				} else if (item.columnName === self.measureKey) {
					self.measureIndex = index;
					self.measureType = item.type;
				}
			});

			//Create a group and series array from row data
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex] === null ? '' : rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex] === null ? '' : rowItem.values[self.seriesIndex];

				grp = self.groupType === util.constants.dataType.TIMESTAMP && grp !== '' ? converter.format(self.oj.IntlConverterUtils.dateToLocalIso(new Date(grp))) : grp;
				srs = self.seriesType === util.constants.dataType.TIMESTAMP && srs !== '' ? converter.format(self.oj.IntlConverterUtils.dateToLocalIso(new Date(srs))) : srs;

				if (!self.groupsArray[grp]) {
					self.groupsArray[grp] = 0;
				}

				if (!self.seriesArray[srs]) {
					self.seriesArray[srs] = [];
				}

				rowItem.values[self.groupIndex] = grp;
				rowItem.values[self.seriesIndex] = srs;
			});

			//populate series array elements with cloned group array
			Object.keys(self.seriesArray).forEach(function (key) {
				var copy_arr = $.extend({}, self.groupsArray);
				this[key] = copy_arr;
			}, self.seriesArray);


			setChartGridData(data);

			//prepare data for charts as a bidimensional arraycloseErrorDialog
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex] === null ? '' : rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex] === null ? '' : rowItem.values[self.seriesIndex];
				var measr = rowItem.values[self.measureIndex];

				self.seriesArray[srs][grp] = measr;
			});


			//reset the chart data
			chartSeries = [];
			chartGroups = [];
			//Generate chart data
			//Since it is a associative array, using Object.keys to iterate
			Object.keys(self.seriesArray).forEach(function (key) {
				var obj = {};
				obj.name = self.selectedSrsTimeGroup().length > 0 ? key + ' ' + self.bundle.vis.timeGroups[self.selectedSrsTimeGroup()[0]] : key;
				obj.items = [];
				var grpDtaArr = this[key];
				Object.keys(grpDtaArr).forEach(function (key) {
					obj.items.push(this[key]);
				}, grpDtaArr);
				chartSeries.push(obj);
			}, self.seriesArray);

			Object.keys(self.groupsArray).forEach(function (key) {
				key = self.selectedGrpTimeGroup().length > 0 ? key + ' ' + self.bundle.vis.timeGroups[self.selectedGrpTimeGroup()[0]] : key;
				chartGroups.push(key);
			}, self.groupsArray);

			self.barSeriesValue(chartSeries);
			self.barGroupsValue(chartGroups);

			// remove overlays for loading
			$('#bpm-vis-cust-chart-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
		};

		/**
		 Prepare the chart grid data and set it to the grid
		 */
		function setChartGridData(data) {
			var dataArray = [];
			self.csvGridData = self.groupKey + ', ' + self.seriesKey + ', ' + self.measureKey;

			//prepare coma seperated data for chart grid
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex];
				var measr = rowItem.values[self.measureIndex];

				var obj = {};
				obj[self.groupKey] = grp;
				obj[self.seriesKey] = srs;
				obj[self.measureKey] = measr;
				dataArray.push(obj);

				self.csvGridData += '\n' + grp + ', ' + srs + ', ' + measr;
			});

			var grpHeaderTxt = '';
			var srsHeaderTxt = '';
			var measrHeaderTxt = 'Count';

			//Chart Result data does not contain label info, hence extract it from columns info
			self.columnDataList().map(function (item) {
				switch (item.name) {
					case self.groupKey:
						grpHeaderTxt = item.displayName;
						break;
					case self.seriesKey:
						srsHeaderTxt = item.displayName;
						break;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.columnDataBIList().map(function (item) {
				switch (item.name) {
					case self.groupKey:
						grpHeaderTxt = item.displayName;
						break;
					case self.seriesKey:
						srsHeaderTxt = item.displayName;
						break;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.measureList().map(function (item) {
				var measrName = self.selectedFunction()[0] + item.name;
				if (measrName === self.measureKey) {
					measrHeaderTxt = item.displayName;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.measureBIList().map(function (item) {
				var measrName = self.selectedFunction()[0] + item.name;
				if (measrName === self.measureKey) {
					measrHeaderTxt = item.displayName;
				}
			});

			//Set Graph labels
			self.xLabel(grpHeaderTxt);
			self.yLabel(measrHeaderTxt);

			//prepare header data for the chart grid
			var headerArr = [{headerText: grpHeaderTxt, field: self.groupKey},
				{headerText: srsHeaderTxt, field: self.seriesKey},
				{headerText: measrHeaderTxt, field: self.measureKey}];

			//reset header info
			util.refreshAll(self.headerTextArr, headerArr);
			//reset Grid datasource
			self.gridDataSource.reset(dataArray);
		}

		//Creates the data object for last N days filter
		function loadLastNDaysFilter() {
			var arr = [];
			for (var key in util.constants.lastNDays) {
				var obj = {};
				obj.id = key;
				obj.label = self.bundle.vis.lastNDays[util.constants.lastNDays[key]];
				arr.push(obj);
			}
			return arr;
		}

		// Load the saved queries in the Saved Query list
		// selectedQuery: Query ID to be selected after loading queries
		function loadSavedQueries(selectedQuery) {
			services.getSavedQueries().done(function (data) {
				util.refreshAll(self.savedQueries, processQueryAPIData(data));
				if (selectedQuery) {
					self.selectedQuery([selectedQuery]);
				} else {
					var queryIdArr = self.savedQueries().length > 0 ? [self.savedQueries()[0].id] : [];
					self.selectedQuery(queryIdArr);
				}
				//refresh the select UI to handle rename of query
				$("#bpm-vis-query-listview").ojListView("refresh");
				showSplashScreenOnStart();
			})
		}

		//Display splash screen if there are no saved queries to prompt user to create a query
		function showSplashScreenOnStart() {
			if (self.savedQueries().length <= 0) {
				if($('#bpm-vis-popup1').ojPopup('isOpen')){
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
				}

				$('#bpm-vis-business-analytics').hide();
				$('#bpm-vis-main-splash').show();
				return true;
			} else {
				$('#bpm-vis-main-splash').hide();
				$('#bpm-vis-business-analytics').show();
				return false;
			}
		}

		//Process the saved queries api result data for UI consumption
		function processQueryAPIData(data) {
			return data.map(function (item) {
				var queryIdIndex = item.href.lastIndexOf('/');
				return {id: item.href.slice(++queryIdIndex), label: item.title};
			});
		}

		//update the form fields with query JSON data
		function setFormFieldsFromJSON() {
			self.selectedSrsTimeGroup([]);
			self.selectedGrpTimeGroup([]);
			self.queryName(self.selectedQueryJSON.title);
			self.description(self.selectedQueryJSON.description);

			var appName = self.selectedQueryJSON.applicationName ? self.selectedQueryJSON.applicationName : util.constants.misc.ANY;
			self.selectedAppName([appName]);
			self.selectedDataSource([self.selectedQueryJSON.dataSource]);
		}

		function displayCharts(oj, payload){
			$('#bpm-vis-cust-splash').hide();
			$('#bpm-vis-chart-tools').show();
			$('#bpm-vis-chart-row1').show();
			$('#bpm-vis-chart-row2').show();

			// Add overlays for loading
			$('#bpm-vis-cust-chart-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
			loadChartData(oj, payload);
			$('#bpm-vis-cust-chart-container').show();
		}

		//reset the fields and initialise the query fields, chart view
		function resetAndInitialize() {
			self.selectedQueryJSON = null;
			self.queryName('');
			self.description('');
			self.selectedDataSource.removeAll();
			self.selectedAppName([util.constants.misc.ANY]);
			loadFormData();
			self.formState = 'new';
			$('#bpm-vis-cust-saved-queries').ojSelect('refresh');
			$('#bpm-vis-cust-splash').show();
			$('#bpm-vis-cust-chart-container').hide();
			$('#bpm-vis-chart-tools').hide();
			$('#bpm-vis-chart-row1').hide();
			$('#bpm-vis-chart-row2').hide();
		}

		//--------------Click / Select Handlers ---------------------
		//Save the query
		self.saveQuery = function (event, data) {
			if (self.queryName().trim() === '') {
				$('#bpm-dsb-warning-dialog').ojDialog('open');
				var msg = self.bundle.vis.error_msg.enter_query_name;
				$("#bpm-vis-warning-dialog-text").text(msg);
				return;
			}
			//Validation to check if same series and group fields have been selected
			if (self.selectedSeries()[0] === self.selectedGroup()[0]) {
				util.errorHandler('', self.bundle.vis.error_msg.fields_cant_be_same);
				return;
			}
			var payload = getPayloadForChartData(event.oj);
			//If JSON object exists for selected query, then update otherwise save new
			if (self.selectedQueryJSON) {
				var selectedQueryId = self.selectedQuery()[0];
				services.updateQuery(JSON.stringify(payload), {'{businessQueryId}': selectedQueryId}).done(function (data) {
					loadSavedQueries(selectedQueryId);
				});
			} else {
				services.saveQuery(JSON.stringify(payload)).done(function (data) {
					var queryId;
					//extract the queryId of the saved query
					if (data.href) {
						var queryIdIndex = data.href.lastIndexOf('/');
						queryId = data.href.slice(++queryIdIndex);
					}
					loadSavedQueries(queryId);
				});
			}

		};
		self.deleteConfirm = function () {
			if (self.selectedQueryJSON) {
				$('#bpm-dsb-confirm-dialog').ojDialog('open');
				var msg = self.bundle.vis.error_msg.delete_confirm;
				$('#bpm-vis-confirm-dialog-text').text(msg);
			} else {
				$('#bpm-dsb-warning-dialog').ojDialog('open');
				var msg1 = self.bundle.vis.error_msg.no_query_selected;
				$('#bpm-vis-warning-dialog-text').text(msg1);
			}
		};
		//Delete a saved query
		self.deleteQuery = function (event, data) {
			if($('#bpm-vis-popup1').ojPopup('isOpen')){
				$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
			}
			$('#bpm-dsb-confirm-dialog').ojDialog('close');
			services.deleteQuery({'{businessQueryId}': self.selectedQuery()[0]}).done(function (data) {
				loadSavedQueries();
				resetAndInitialize();
			});
			if ($('#bpm-vis-delete-app').ojDialog('isOpen')) {
				$('#bpm-vis-delete-app').ojDialog('close');
			}
		};
		//Handler for New Query action
		self.newQuery = function (event, data) {
			resetAndInitialize();

			self.queryName(self.bundle.vis.formlbl.default_query_name);
			$('#bpm-vis-chart-row1').show();
			$('#bpm-vis-chart-row2').show();
			self.selectedQuery([]);
			self.selectedQueryBtn([util.constants.misc.VISIBLE]);

			self.selectedQuery.removeAll();
			if ($('#bpm-vis-delete-app').ojDialog('isOpen')) {
				$('#bpm-vis-delete-app').ojDialog('close');
			}
		};
		//Handler for Copy Query action
		self.copyQuery = function (event, data) {
			if (self.selectedQueryJSON) {
				self.selectedQueryJSON = null;
				self.selectedQuery.removeAll();
				self.selectedQueryBtn([util.constants.misc.VISIBLE]);
				var queryName = self.bundle.vis.formlbl.copy_of + ' ' + self.queryName();
				self.queryName(queryName);
			}
		};
		//Handler for change in selection of Saved Query
		self.queryChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var currentVal = data.value[0];
				if (currentVal) {
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					services.getQuery({'{businessQueryId}': currentVal}).done(function (data) {
						self.formState = 'reload';
						self.selectedQueryJSON = data;
						setFormFieldsFromJSON();
						displayCharts(self.oj, self.selectedQueryJSON);
					}).fail(
						function (jqXHR) {
							$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
							if (jqXHR.status === 403) {
								var respJSON = $.parseJSON(jqXHR.responseText);
								var respMsg = respJSON && respJSON.message ? respJSON.message : '';
								$('#bpm-vis-delete-app').ojDialog('open');
								$("#bpm-vis-delete-app-text").text(respMsg);
							}
						}
					);
				}
				if (!currentVal && self.savedQueries().length > 0 && data.optionMetadata.writeback === 'shouldWrite') {
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					resetAndInitialize();
				}
			}
		};

		//Handler for reset action
		self.resetQuery = function (event, data) {
			self.formState = 'reload';
			if (self.selectedQueryJSON) {
				setFormFieldsFromJSON();
				displayCharts(self.oj, self.selectedQueryJSON);
			} else {
				self.selectedQueryJSON = null;
				self.selectedDataSource.removeAll();
				self.selectedAppName([util.constants.misc.ANY]);
				loadFormData();
				self.formState = 'new';
				$('#bpm-vis-cust-splash').show();
				$('#bpm-vis-cust-chart-container').hide();
				self.selectedQuery.removeAll();
			}
		};

		self.dataSourceChangeHandler = function (event, data) {
			// Add overlays for loading
			$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');

			if (data.option == util.constants.misc.VALUE) {
				if (data.optionMetadata.writeback === 'shouldWrite') {
					self.formState = 'new';
				}
				loadColumnData(self.selectedDataSource()[0], self.selectedAppName()[0]);
				self.filterCriteriaList.removeAll();
			}
		};
		//define the handler on select of item in appNameList
		self.appNameChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				if (data.optionMetadata.writeback === 'shouldWrite') {
					self.formState = 'new';
					var selectedValue = self.selectedAppName()[0];
					// Add overlays for loading
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					loadColumnData(self.selectedDataSource()[0], selectedValue);
				}
				self.filterCriteriaList.removeAll();
			}
		};

		// Handle on change event for series field
		self.seriesChangeHandler = function (event, data) {
			displayTimeGroup(data, 'srs');
		};
		// Handle on change event for group  field
		self.groupChangeHandler = function (event, data) {
			displayTimeGroup(data, 'grp');
		};

		self.functionChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var selectedValue = data.value[0];
				// If count is selected, then disable measure field
				if (selectedValue === util.constants.functionList.COUNT && !self.measureDisabled()) {
					self.measureDisabled(true);
					self.selectedMeasure(['*']);
				} else if (selectedValue !== util.constants.functionList.COUNT && self.measureDisabled()) {
					self.measureDisabled(false);
					if (self.selectedMeasure().length < 1 || self.selectedMeasure()[0] === '*') {
						self.selectedMeasure([self.measureList()[0].name]);
					}
				}
			}
		};

		self.measureChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var selectedValue = data.value[0];

				self.measureList().map(function (item) {
					refreshAggregations(item, selectedValue);
				});

				self.measureBIList().map(function (item) {
					refreshAggregations(item, selectedValue);
				});

			}
		};


		// Handler for change in Last N Days selection
		self.handleLastNDaySelect = function (event, data) {
			if (data.option == util.constants.misc.VALUE && data.optionMetadata.writeback === 'shouldWrite') {
				self.runQuery(event, data);
			}
		};

		// Handler for click of Visualize button
		self.visualize = function (event, data) {
			self.selectedChartType(util.constants.chartType.BAR);
			self.runQuery(event, data);
		};

		//Run the query and display the charts
		self.runQuery = function(event, data){
			//Validation to check if same series and group fields have been selected
			if (self.selectedSeries()[0] === self.selectedGroup()[0]) {
				util.errorHandler('', self.bundle.vis.error_msg.fields_cant_be_same);
				return;
			}
			self.closePopup();
			displayCharts(event.oj);
		};

		// Handler for click of Start button
		self.handleStartClick = function (event, data) {
			$('#bpm-vis-main-splash').hide();
			$('#bpm-vis-business-analytics').show();
			$("#bpm-vis-chart-row1").show();
			$("#bpm-vis-chart-row2").show();
			self.queryName(self.bundle.vis.formlbl.default_query_name);
			self.selectedQuery([]);
			self.selectedQueryBtn([util.constants.misc.VISIBLE]);
		};

		self.addFilter = function () {
			var filter = new FilterModel();
			self.filterCriteriaList.push(filter);
		};

		self.removeFilter = function (filter) {
			self.filterCriteriaList.remove(filter);
		};

		self.handleSnapBtnClick = function (event, data) {
			var isPopupOpen = false;
			var toggleOptions = {
				duration: 'slide',
				start: function () {
					$("#bpm-vis-chart").hide();
					isPopupOpen = $('#bpm-vis-popup1').ojPopup('isOpen');
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
				},
				complete: function () {
					$("#bpm-vis-chart").show().toggleClass("oj-lg-11");
					if(isPopupOpen){
						$('#bpm-vis-popup1').ojPopup('open', '#bpm-vis-querybtn');
					}
				}
			};
			$("#bpm-vis-cust-drawer").toggle(toggleOptions).toggleClass('closed');


			if ($("#bpm-vis-cust-drawer").is(".closed")) {
				$("#show-hide-navigation").toggleClass("bpm-vis-show-navlist");
			} else {
				$("#show-hide-navigation").toggleClass("bpm-vis-show-navlist");
			}

		};

		self.selectedQuery.subscribe(function (newValue) {
			if (newValue.length > 0) {
				$("#bpm-vis-copy").ojButton({"disabled": false});
				$("#bpm-vis-delete").ojButton({"disabled": false});
			} else {
				$("#bpm-vis-copy").ojButton({"disabled": true});
				$("#bpm-vis-delete").ojButton({"disabled": true});
			}

			if (newValue.length > 0) {
				var currentVal = newValue;
				if (currentVal) {
					services.getQuery({'{businessQueryId}': currentVal}).done(function (data) {
						self.formState = 'reload';
						self.selectedQueryJSON = data;
						setFormFieldsFromJSON();
						displayCharts(self.oj, self.selectedQueryJSON);
					}).fail(
						function (jqXHR) {
							$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
							if (jqXHR.status === 403) {
								var respJSON = $.parseJSON(jqXHR.responseText);
								var respMsg = respJSON && respJSON.message ? respJSON.message : '';
								$('#bpm-vis-delete-app').ojDialog('open');
								$("#bpm-vis-delete-app-text").text(respMsg);
							}
						}
					);
				}
			}
		});

		self.selectedQueryBtn = ko.observableArray([]);

		//Handle on click of Query Button
		self.selectedQueryBtn.subscribe(function (newValue) {
			if(util.constants.misc.VISIBLE === newValue[0]){
				$('#bpm-vis-popup1').ojPopup( { "position": { "my": "start top","at": "start bottom", "of": "#bpm-vis-querybtn"} } );
				$('#bpm-vis-popup1').ojPopup('open', '#bpm-vis-querybtn');
			} else {
				$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
			}
		});

		self.closePopup = function(){
			self.selectedQueryBtn([]);
		};

		$('#bpm-unifiedCharts-tabs').ojTabs({
			"deselect": function( event, ui ) {
				if($('#bpm-vis-popup1').ojPopup('isOpen')){
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
					self.selectedQueryBtn([]);
				}
			}
		});


		// ------------------Chart related Code ----
		var converterFactory = oj.Validation.converterFactory('number');
		/* toggle button variables */
		self.stackValue = ko.observable('off');
		self.orientationValue = ko.observable('vertical');
		self.selectedChartType = ko.observable(util.constants.chartType.BAR);
		self.xLabel = ko.observable('');
		self.yLabel = ko.observable('');

		/* chart data */
		var chartSeries = [];
		var chartGroups = [];
		var decimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 3});

		self.barSeriesValue = ko.observableArray(chartSeries);
		self.barGroupsValue = ko.observableArray(chartGroups);
		self.yAxisConverter = ko.observable(decimalConverter);

		/* toggle buttons*/
		self.stackOptions = [
			{
				id: 'unstacked',
				label: self.bundle.vis.chart.unstacked,
				value: 'off',
				icon: 'oj-icon demo-bar-unstack'
			},
			{
				id: 'stacked',
				label: self.bundle.vis.chart.stacked,
				value: 'on',
				icon: 'oj-icon demo-bar-stack'
			}
		];
		self.orientationOptions = [
			{
				id: 'vertical',
				label: self.bundle.vis.chart.vertical,
				value: 'vertical',
				icon: 'oj-icon demo-bar-vert'
			},
			{
				id: 'horizontal',
				label: self.bundle.vis.chart.horizontal,
				value: 'horizontal',
				icon: 'oj-icon demo-bar-horiz'
			}
		];

		self.selectedGridToggle = ko.observableArray([]);
		var lastSelectedChartType;

		self.selectedGridToggle.subscribe(function (newValue) {
			if (newValue.length > 0) {
				$('#bpm-vis-cust-chart').hide();
				$('#bpm-vis-cust-grid-data').show();
				$('#bpm-vis-cust-table').ojTable('refresh');
				if (self.selectedChartType() !== null) {
					lastSelectedChartType = self.selectedChartType();
					self.selectedChartType(null);
				}
			} else {
				self.selectedChartType(lastSelectedChartType);
				$('#bpm-vis-cust-chart').show();
				$('#bpm-vis-cust-chart').ojChart('refresh');
				$('#bpm-vis-cust-grid-data').hide();
			}

		});

		self.selectedChartType.subscribe(function (newValue) {
			if (newValue !== null) {
				lastSelectedChartType = newValue;
				self.selectedGridToggle([]);
			}
		});

		//------------------ Graph Data Grid Code --------------

		self.downloadCsv = function (data) {
			var filename, link, csv;

			filename = 'export.csv';

			csv = data.csvGridData;
			csv = 'data:text/csv;charset=utf-8,' + csv;
			data = encodeURI(csv);

			link = document.createElement('a');
			link.style = "visibility:hidden";
			link.setAttribute('href', data);
			link.setAttribute('download', filename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		self.csvGridData = '';
		self.headerTextArr = ko.observableArray([]);
		self.graphGridDataArray = ko.observableArray([]);


		self.gridDataSource = new oj.ArrayTableDataSource(self.graphGridDataArray(), {});


		// ------ Loading Mechanism -------------------


		function FilterModel() {
			var filter = this;
			filter.columnDataValue = ko.observableArray([self.columnDataList()[0].name]);
			filter.operatorValue = ko.observableArray(['EQ']);
			filter.selectedValue = ko.observableArray(['']);
			filter.dataType = ko.observable(self.columnDataList()[0].dataType);

			filter.columnDataValueChangeHandler = function (event, data) {
				filter.selectedValue('');
				if (data.option == "value") {
					var columnName = data.value[0];
					//loggerUtil.log("New Type of Chart-" +columnName);
					for (var i = 0; i < self.columnDataList().length; i++) {
						var name = self.columnDataList()[i].name;
						if (name === columnName) {
							var type = self.columnDataList()[i].dataType;
							//loggerUtil.log("tyep is - " + type );
							filter.dataType(type);
							filter.operatorValue(['EQ']);
							break;
						}
					}
					//loggerUtil.log("New Type of Chart-" +columnName);
					for (var j = 0; j < self.columnDataBIList().length; j++) {
						var name1 = self.columnDataBIList()[j].name;
						if (name1 === columnName) {
							var type1 = self.columnDataBIList()[j].dataType;
							//loggerUtil.log("tyep is - " + type1 );
							filter.dataType(type1);
							filter.operatorValue(['EQ']);
							break;
						}
					}
				}
			};

		}

		self.closeErrorDialog = function (event, data) {
			$("#bpm-dsb-warning-dialog").ojDialog("close");
		};

	}

	return customDashboardContainerModel;
});
