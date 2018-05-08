/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'jquery', 'ojs/ojtable', 'ojs/ojbutton', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util, $) {
	/**
	 * The view model for the main content view template
	 */
	function closedDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		this.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		var authInfo =this.parent.authInfo; // Login credentials

		// --- knockout bindings ------
		self.processes = ko.observableArray([]);
		self.datasource = new oj.ArrayTableDataSource(self.processes,{idAttribute: "index"});
		self.period = ko.observable('today');

		self.periodButtons = [
			{id: 'today', label: self.bundle.closed.button.today},
			{id: 'week', label: self.bundle.closed.button.this_week},
			{id: 'month', label: self.bundle.closed.button.this_month}
		];

		self.periodLabels = {
			today: [self.bundle.closed.period.today,
				self.bundle.closed.period.yesterday],
			week: [self.bundle.closed.period.this_week,
				self.bundle.closed.period.last_week],
			month: [self.bundle.closed.period.this_month,
				self.bundle.closed.period.last_month]
		};

		self.periodQueries = {
			today: 'TODAY',
			week: 'THIS_WEEK',
			month: 'THIS_MONTH'
		};

		self.totals = ko.observable([0,0,0,0]);

		self.handlePeriodChange = function() {
			self.loadData();
			// temporary hack due to OJTABLE: CHANGING COLUMNS DOES NOT CHANGE COLUMN HEADERS
			var table = document.getElementById("closedProcesses");
			ko.cleanNode(table);
			ko.applyBindings(self,table);
		};

		self.renderHeader = function(context) {
			var column = context.columnIndex;
			if (column > 4) {
				var labels = [self.bundle.closed.table.completed,
					self.bundle.closed.table.aborted,
					self.bundle.closed.table.errored,
					self.bundle.closed.table.avg_cycle,
					self.bundle.closed.table.avg_cycle,
					self.bundle.closed.table.max_cycle
				];
				var lines = [labels[column-2], self.periodLabels[self.period()][(column == 6) ? 1 : 0]];
				context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
				{
					for (var i=0; i<lines.length; i++) {
						var headerTextDiv = $(document.createElement('div'));
						headerTextDiv.text(lines[i]);
						headerContentDiv.append(headerTextDiv);
					}
					headerContentDiv.parent().attr("style", "height:auto; text-align: center;");
				});
			}
		};


		self.columns = [{headerText: self.bundle.closed.table.application, field: 'application', style: 'width: 24%'},
			{headerText: self.bundle.closed.table.process, field: 'process', style: 'width: 25%'},
			{headerText: self.bundle.closed.table.completed, field: 'completed', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-succ-column bpm-dsb-light-green-bg'},
			{headerText: self.bundle.closed.table.aborted, field: 'aborted', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-fail-column bpm-dsb-light-red-bg'},
			{headerText:  self.bundle.closed.table.errored, field: 'errored', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-fail-column bpm-dsb-light-red-bg'},
			{field: 'avgThis', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-column', template: 'bpm_charts_closed_proc_avg_cycle_tmpl'},
			{field: 'avgLast', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-column'},
			{field: 'max', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-max-column'}
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
			$('#bpm-dsb-closed-table-overlay').addClass('bpm-dsb-load-overlay');

			var q = "CLOSED_PROCESS_ANALYSIS_" + self.periodQueries[self.period()];
			self.load(q + "_BILLBOARD" + param, self.populateClosedBillboard);
			self.load(q + "_TABLE" + param, self.populateClosedTable);
		};

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

		self.populateClosedBillboard = function(data){
			if(data && data.rows){
				var totals = [0,0,0,0];
				var c = util.columnAlias(data);
				var row = data.rows[0];
				totals[0] = row.values[c.TOTAL_CLOSED]+0;
				totals[1] = row.values[c.TOTAL_COMPLETED]+0;
				totals[2] = row.values[c.TOTAL_ABORTED]+0;
				totals[3] = row.values[c.TOTAL_FAULTED]+0;
				self.totals(totals);
			}
		};

		self.populateClosedTable = function(data){
			var p_array = [];

			if (data && data.rows) {
				var c = util.columnAlias(data);
				$.each(data.rows,function(index,row) {
					var p = {};
					p.index = index;	// for idAttribute needed by ojTable for some reason
					p.application = row.values[c.COMPOSITE_NAME];
					p.process = row.values[c.PROCESS_LABEL];
					p.completed = row.values[c.TOTAL_COMPLETED]+0;
					p.aborted = row.values[c.TOTAL_ABORTED]+0;
					p.errored = row.values[c.TOTAL_FAULTED]+0;
					p.avgThis = (row.values[c.CURR_AVG_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p.avgLast = (row.values[c.PREV_AVG_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p.isCycletimeIncreasing = row.values[c.IS_CYCLE_TIME_INCREASING]+0;
					p.max = (row.values[c.MAX_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p_array.push(p);
				});
			}
			// remove overlays for loading
			$('#bpm-dsb-closed-table-overlay').removeClass('bpm-dsb-load-overlay');

			self.processes(p_array);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 4){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 4) {
				self.loadData();
			}
		});

		this.handleAttached = function(info) {
			//self.loadData();
		}

	}

	return closedDashboardContainerModel;
});
