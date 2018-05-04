/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'jquery', 'ojs/ojtable', 'ojs/ojbutton', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util, $) {
	/**
	 * The view model for the Open Process Summary Dashboard
	 */
	function openDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		this.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		this.drilldownUrl = this.parent.processTrackingPage + '?processName=';
		var authInfo =this.parent.authInfo; // Login credentials

		self.processes = ko.observableArray([]);
		self.datasource = new oj.ArrayTableDataSource(self.processes,{idAttribute: "index"});

		self.totals = ko.observable([0,0,0,0,0,0]);

		// handles rendering of two line column header, since ojTable does not seem to do this natively
		self.renderHeader = function(context) {
			var column = context.columnIndex;
			if (column == 3)
				var lines = self.bundle.open.table.due_this_week.split("\n");
			else if (column == 7)
				var lines = self.bundle.open.table.opened_today.split("\n");
			else
				var lines = self.bundle.open.table.closed_today.split("\n");
			context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
			{
				for (var i=0; i<lines.length; i++) {
					var headerTextDiv = $(document.createElement('div'));
					headerTextDiv.text(lines[i]);
					headerContentDiv.append(headerTextDiv);
				}
				headerContentDiv.parent().attr("style", "height:auto; text-align: center;");
			});
		};

		self.columns = [ {headerText: self.bundle.open.table.application, field: 'application', style: 'width: 15%'},
			{style: 'width: 15%',headerTemplate: 'bpm_charts_open_proc_header', template:'bpm_charts_open_proc_proc_name'},
			{headerText: self.bundle.open.table.on_track,field: 'ontrack', style: 'width: 10%', className: 'bpm-dsb-open-tbl-ontrack-column bpm-dsb-light-green-bg'},
			{headerRenderer: self.renderHeader, field: 'due', style: 'width: 10%', className: 'bpm-dsb-open-tbl-due-column bpm-dsb-light-orange-bg'},
			{headerText: self.bundle.open.table.overdue, field: 'overdue', style: 'width: 10%', className: 'bpm-dsb-open-tbl-overdue-column bpm-dsb-light-red-bg'},
			{headerText: self.bundle.open.table.recoverable, field: 'recoverable', style: 'width: 10%', className: 'bpm-dsb-open-tbl-column'},
			{headerText: self.bundle.open.table.suspended, field: 'suspended', style: 'width: 10%', className: 'bpm-dsb-open-tbl-column'},
			{headerRenderer: self.renderHeader, field: 'opened', style: 'width: 10%', className: 'bpm-dsb-open-tbl-today-column bpm-dsb-light-grey-bg'},
			{headerRenderer: self.renderHeader, field: 'closed', style: 'width: 10%', className: 'bpm-dsb-open-tbl-today-column bpm-dsb-light-grey-bg'}
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
			//reset the current row to show non selected
			$("#openProcesses").ojTable("option", "currentRow", null);
			// Add overlays for loading
			$('#bpm-dsb-open-table-overlay').addClass('bpm-dsb-load-overlay');

			self.load("OPEN_PROCESS_SUMMARY_BILLBOARD"+param, self.populateOpenBillboard);
			self.load("OPEN_PROCESS_SUMMARY_TABLE"+param, self.populateOpenTable);
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

		self.populateOpenBillboard = function(data){
			if(data && data.rows){
				var totals = [0,0,0,0,0,0];
				var c = util.columnAlias(data);
				var row = data.rows[0];
				totals[0] = row.values[c.TOTAL_OPEN]+0;
				totals[1] = row.values[c.TOTAL_OPEN_NOT_DUE_SOON]+0;	// ??
				totals[2] = row.values[c.TOTAL_DUE_SOON]+0;
				totals[3] = row.values[c.TOTAL_OVERDUE]+0;
				totals[4] = row.values[c.TOTAL_OPENED_TODAY]+0;
				totals[5] = row.values[c.TOTAL_CLOSED_TODAY]+0;
				self.totals(totals);
			}
		}

		self.populateOpenTable = function(data){
			var p_array = [];
			if (data && data.rows) {
				var c = util.columnAlias(data);
				$.each(data.rows,function(index,row) {
					var p = {};
					p.index = index;	// for id Attribute needed by ojTable for some reason
					p.application = row.values[c.COMPOSITE_NAME];
					p.process = row.values[c.PROCESS_LABEL];
					p.ontrack = row.values[c.TOTAL_OPEN_NOT_DUE_SOON];
					p.due = row.values[c.TOTAL_DUE_SOON];
					p.overdue = row.values[c.TOTAL_OVERDUE];
					p.recoverable = row.values[c.TOTAL_FAULTED_RECOVERABLE];
					p.suspended = row.values[c.TOTAL_SUSPENDED];
					p.opened = row.values[c.TOTAL_OPENED_TODAY];
					p.closed = row.values[c.TOTAL_CLOSED_TODAY];
					p.processId = row.values[c.PROCESS_NAME];
					p_array.push(p);
				});
			}
			// remove overlays for loading
			$('#bpm-dsb-open-table-overlay').removeClass('bpm-dsb-load-overlay');

			self.processes(p_array);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 1){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 1) {
				self.loadData();
			}
		});

		this.processDrillDown = function(data,event) {
			//ignore keypress other than enter
			if (event.type === 'keypress' && event.keyCode != 13) {
				return;
			}
			util.drilldown(self.drilldownUrl+data.processId);
		};

		this.handleAttached = function(info) {
			//self.loadData();
		}
	}

	return openDashboardContainerModel;
});
