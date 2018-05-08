/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout', 'pcs/charts/dashboard/util', 'ojs/ojchart', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util) {
	/**
	 * The view model for the main content view template
	 */
	function cycleTimeDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		self.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		var authInfo =this.parent.authInfo; // Login credentials

		// --- knockout bindings ------
		self.cycleSeries = ko.observableArray();
		self.cycleGroups = ko.observableArray();
		self.workloadSeries = ko.observableArray();
		self.workloadGroups = ko.observableArray();

		self.total = ko.observable(0);
		self.opened = ko.observable(0);
		self.closed = ko.observable(0);

		var converterFactory = oj.Validation.converterFactory('number');

		// to remove decimal  in the workload chart values
		var workloadDecimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 0});
		self.workloadValueConverter  = ko.observable(workloadDecimalConverter);

		// to remove decimal  in the cycle time chart values
		var cycleDecimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 2});
		self.cycleValueConverter  = ko.observable(cycleDecimalConverter);


		self.viewBy = new ko.observable('BY_PROCESS');
		self.viewByLabel1 = ko.computed(function() {return self.viewBy() === 'BY_PROCESS' ?
			self.bundle.cycleTime.chart.process_cycle_time :
			self.bundle.cycleTime.chart.task_cycle_time;
		});
		self.viewByLabel2 = ko.computed(function() {return self.viewBy() === 'BY_PROCESS' ?
			self.bundle.cycleTime.chart.process_workload :
			self.bundle.cycleTime.chart.task_workload;
		});

		self.viewButtons = [
			{id: 'BY_PROCESS', label: self.bundle.cycleTime.button.by_process},
			{id: 'BY_TASK', label: self.bundle.cycleTime.button.by_task}
		];

		//  Method to refresh the content
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			var param = util.paramList(self);
			return param;
		};

		// load/reload process data to display
		this.loadData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-cycle-chart-cycle-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-cycle-chart-wkld-overlay').addClass('bpm-dsb-load-overlay');

			self.load("CYCLE_TIME_"+self.viewBy()+"_BILLBOARD"+param, self.populateCycleTimeBillboard);
			self.load("CYCLE_TIME_"+self.viewBy()+"_CHART"+param, self.populateCycleTimeChart);
			self.load("WORKLOAD_"+self.viewBy()+"_CHART"+param, self.populateWorkloadChart);
		}

		self.load = function(query, populate){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (authInfo) {
						xhr.setRequestHeader('Authorization', authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json);
				},
				error: function ( jqXHR) {
					populate();
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in ' + query);
				}
			});
		};

		self.populateCycleTimeBillboard = function(data) {
			if (data && data.rows) {
				var c = util.columnAlias(data);
				var row = data.rows[0];
				self.total(row.values[c.TOTAL_OPEN]+0);
				self.opened(row.values[c.TOTAL_OPENED_TODAY]+0);
				self.closed(row.values[c.TOTAL_CLOSED_TODAY]+0);
			}
		}

		self.populateCycleTimeChart = function(data) {
			var dateRange = [];
			var series = [];

			if (data && data.rows && data.rows.length >0) {
				var c = util.columnAlias(data);
				var processes = {};	// or tasks
				dateRange = self.setDateRange(data.rows, c);
				var startDate = dateRange[0];
				$.each(data.rows, function (index, row) {
					var offset = self.dayOffset(row, startDate, c);
					var procLabel = row.values[c.PROCESS_LABEL];
					if (!(procLabel in processes)) {
						processes[procLabel] = [];	// sparse array for chart data

						for (var i=0 ;i <dateRange.length ;i++ ){
							processes[procLabel][i] = 0;
						}

					}
					processes[procLabel][offset] = row.values[c.AVG_CYCLE_TIME];
				});

				for (var proc in processes) {
					series.push({name: proc, items: processes[proc]});
				}
			}
			// remove overlays for loading
			$('#bpm-dsb-cycle-chart-cycle-overlay').removeClass('bpm-dsb-load-overlay');

			self.cycleSeries(series);
			self.cycleGroups(dateRange);

		};

		self.populateWorkloadChart = function(data) {
			var dateRange = [];
			var series = [];

			if (data && data.rows  && data.rows.length >0) {
				var c = util.columnAlias(data);
				var processes = {};	// or tasks
				dateRange = self.setDateRange(data.rows,c);
				var startDate = dateRange[0];
				$.each(data.rows,function(index,row) {
					var offset = self.dayOffset(row,startDate,c);
					var procLabel = row.values[c.PROCESS_LABEL];
					if (!(procLabel in processes))
						processes[procLabel] = [];	// sparse array for chart data
					processes[procLabel][offset] = row.values[c.TOTALWORKLOAD];
				});

				for (var proc in processes) {
					series.push({name: proc, items: processes[proc]});
				}
			}
			// remove overlays for loading
			$('#bpm-dsb-cycle-chart-wkld-overlay').removeClass('bpm-dsb-load-overlay');

			self.workloadSeries(series);
			self.workloadGroups(dateRange);
		};

		// utility function to calculate day offset for chart positioning
		self.dayOffset = function(row,startDate,c) {
			var d = new Date(row.values[c.YEAR_PROCESS_DATE],row.values[c.MONTH_PROCESS_DATE]-1,row.values[c.DAYOFMONTH_PROCESS_DATE]);
			return (d.getTime() - startDate.getTime()) / (24*60*60*1000);
		};

		// utility function to set up data range for charts
		self.setDateRange = function(rowData,c) {
			var v = rowData[0].values;
			var startingDate = new Date(v[c.YEAR_PROCESS_DATE],v[c.MONTH_PROCESS_DATE]-1,v[c.DAYOFMONTH_PROCESS_DATE]);
			v = rowData[rowData.length-1].values;
			var endingDate = new Date(v[c.YEAR_PROCESS_DATE],v[c.MONTH_PROCESS_DATE]-1,v[c.DAYOFMONTH_PROCESS_DATE]);
			var nDays = (endingDate.getTime() - startingDate.getTime() + 1) / (24*60*60*1000);
			var d = new Date(startingDate);
			d.setHours(0,0,0,0);
			var dateRange = [];
			for (var i=0; i<nDays; i++) {
				dateRange.push(new Date(d));
				d.setDate(d.getDate()+1);
			}
			return dateRange;
		}



		self.viewBy.subscribe(function() {self.loadData();});


		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 3){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 3) {
				self.loadData();
			}
		});

		this.handleAttached = function(info) {
			//self.loadData();
		}
	}

	return cycleTimeDashboardContainerModel;
});
