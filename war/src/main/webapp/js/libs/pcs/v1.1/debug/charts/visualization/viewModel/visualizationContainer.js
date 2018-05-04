/**
 * Created by nisabhar on 11/20/2015.
 */

define(['ojs/ojcore' ,'knockout', 'pcs/charts/visualization/viewModel/util/visualizationUtil', 'ojs/ojknockout',
	'pcs/charts/visualization/viewModel/custom/customDashboard',
	'!text!pcs/charts/visualization/view/custom/businessAnalytics.html', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function visualizationContainerModel(params) {
		var self = this;
		this.parent = params.parent;
		this.baseURL = this.parent.baseURL; //server address
		this.baseRestUrl = this.parent.baseRestURL; //Rest

		this.authInfo = this.parent.authInfo; // Login credentials

		this.chartEndpoint = "analytics/ootbqueries/";

		this.processTrackingPage = this.parent.processTrackingPage;
		this.tasksPage = this.parent.tasksPage;

		this.rootElement= this.parent.rootElement;

		// Hide the dashboard loading indicator
		$("#bpm-vis-loading-indicator",this.rootElement).hide();

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');
	}

	return visualizationContainerModel;
});
