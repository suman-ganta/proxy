/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout', 'pcs/charts/dashboard/util', 'ojs/ojknockout' ,'ojs/ojtabs', 'ojs/ojoffcanvas', 'ojs/ojbutton' ,
	'ojs/ojinputtext', 'ojs/ojcheckboxset' ,'ojs/ojchart', 'ojs/ojlegend', 'ojs/ojdialog', 'ojL10n!pcs/resources/nls/dashboardResource',
	'pcs/charts/dashboard/viewModel/dashboards/healthDashboard', '!text!pcs/charts/dashboard/view/dashboards/healthDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/openDashboard', '!text!pcs/charts/dashboard/view/dashboards/openDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/workloadDashboard', '!text!pcs/charts/dashboard/view/dashboards/workloadDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/cycleTimeDashboard', '!text!pcs/charts/dashboard/view/dashboards/cycleTimeDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/closedDashboard', '!text!pcs/charts/dashboard/view/dashboards/closedDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/filters/processFilter', '!text!pcs/charts/dashboard/view/dashboards/filters/processFilter.html'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function dashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		this.parent = params.parent;
		this.baseURL = this.parent.baseURL; //server address
		this.baseRestUrl = this.parent.baseRestURL; //Rest  '/bpm/api/1.0/'

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.authInfo = this.parent.authInfo; // Login credentials

		this.chartEndpoint = "analytics/ootbqueries/";

		this.processTrackingPage = this.parent.processTrackingPage;
		this.tasksPage = this.parent.tasksPage;

		this.selectedTab = ko.observable(0);  // Binding for left side currently selected tabs
		this.workloadSubTab = ko.observable('top10_by_task') ; // Sub tab selected on workload page

		//----For Process List data ------
		self.processRestEndPoint = this.baseRestUrl + this.chartEndpoint + "PROCESS_LABEL_LIST";
		self.processListChangeSwitch = ko.observable(false);   // A switch we will just do on off so that subscribers know data has been changed
		self.processData = [];

		// REST CALL to populate Process List
		self.loadProcessList = function(){
			//  loggerUtil.log(self.processRestEndPoint);
			var url = self.processRestEndPoint ;
			var response = $.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (self.authInfo) {
						xhr.setRequestHeader('Authorization', self.authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					self.populateProcessList(json);
				},
				error: function ( jqXHR) {
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('error in loadProcessList');
				}
			});
		};

		//-- Method to populate Process List----
		self.populateProcessList = function(data) {
			self.processData = data;
			self.processListChangeSwitch( !self.processListChangeSwitch());
		};

		self.loadProcessList();

		//----For off canvas data ------
		self.filterApplied = ko.observable(false);

		// An object that maps launcher ids to offcanvas objects
		self.offcanvasMap =
			{
				"displayMode": "overlay",
				"selector": "#endDrawer"
			};

		// toggle show/hide offcanvas
		self.toggleDrawer = function(model, event)
		{
			var launcherId = event.currentTarget.id;
			var drawer = self.offcanvasMap;
			drawer.launcherId = launcherId;
			return oj.OffcanvasUtils.open(drawer);
		}

		// hide offcanvas from the viewport
		self.closeInner = function() {
			return oj.OffcanvasUtils.close( self.offcanvasMap);
		};

		self.apply = function(){
			self.filterApplied( !self.filterApplied());
			self.closeInner();
		};


		self.closeErrorDialog= function(){
			$("#bpm-dsb-error-dialog").ojDialog("close");
		};

		// Hide the dashboard loading indicator
		$("#bpm-dsb-loading-indicator").hide();

	}

	return dashboardContainerModel;
});
