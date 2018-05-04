/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function healthDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of dashboardContainer

		self.baseRestUrl = self.parent.baseRestUrl;
		self.restEndPoint = self.parent.baseRestUrl + self.parent.chartEndpoint;
		var authInfo =self.parent.authInfo; // Login credentials

		//count related bindings
		self.openCount = ko.observable(0);  // No of open task
		self.progressCount = ko.observable(0);  // No of active task
		self.recoverableCount = ko.observable(0);  //No.of recoverable task
		self.suspendedCount = ko.observable(0);  // No.of suspended task

		self.processTrackingPage = self.parent.processTrackingPage;
		self.totalCountURL= self.processTrackingPage;
		self.progressCountURL = self.processTrackingPage+"?status=OPEN&userRole=USER_ROLE_ADMIN";    // No of active task
		self.recoverableCountURL = self.processTrackingPage +"?status=FAULTED_RECOVERABLE&userRole=USER_ROLE_ADMIN";   //No.of recoverable task
		self.suspendedCountURL = self.processTrackingPage+ "?status=SUSPENDED&userRole=USER_ROLE_ADMIN" ;  // No.of suspended task

		//chart convertors for percentage
		//var converterFactory = oj.Validation.converterFactory('number');
		//var converterOptions = {style: 'percent'};

		//chart related bindings
		self.barSeriesValue = ko.observableArray();  // List of count on x axis
		self.barGroupsValue = ko.observableArray(); // List of processes on Y axis
		//self.yConverter = converterFactory.createConverter(converterOptions);

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

		// Primary function for load/reload process data to display
		self.loadData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-health-chart-overlay').addClass('bpm-dsb-load-overlay');

			//Load count data
			self.load(util.queries.PROCESS_HEALTH_BILLBOARD+param,self.populateHealthBillboardData);
			//Load chart data
			self.load(util.queries.PROCESS_HEALTH_TABLE+param,self.populateHealthTable);
		};

		// function for loading  data using AJAX
		self.load = function(query ,populate){
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
					loggerUtil.log('failed in loading health data -' + query);
				}
			});
		};

		// method to populate Billboard data
		self.populateHealthBillboardData = function(data){
			if(data && data.rows){
				var c = util.columnAlias(data);
				var row = data.rows[0]; // all the data is in the first row

				self.openCount(row.values[c.TOTAL_OPEN]+0);
				self.progressCount(row.values[c.TOTAL_ACTIVE]+0);
				self.suspendedCount(row.values[c.TOTAL_SUSPENDED]+0);
				self.recoverableCount(row.values[c.TOTAL_FAULTED_RECOVERABLE]+0);
			}
		};

		// method to populate charts
		// Data columns - "PROCESS_LABEL" , "PROCESS_INSTANCE_STATUS","TOTALCOUNT","PERCENTAGE"
		self.populateHealthTable = function(data){
			var barGroups = [];     //["Process 1", "Process 2" ,"Process 3", "Process 4" ,"Process 5"];
			var barSeriesNames =  [];  // Active, Recoverable ,Suspended

			var barSeriesItems = [];
			var barSeries = [];

			var barsColorArray = {
				'ACTIVE' :'#bde2a0',
				'RECOVERABLE' : '#f0a7a8',
				'SUSPENDED' :'#bee5f6',
				'ABORT':'#003366'
			};




			var stateMap ={}; //'ACTIVE' :0, 'RECOVERABLE' :1, 'SUSPENDED' :2, 'ABORT' :3 ....
			var processes = {}; // Create a object list in which process object has its states listed

			if(data && data.rows) {
				var c = util.columnAlias(data);
				for(var i=0 ;i< data.rows.length; i++){
					// Get the values for each column in the response
					var procName = data.rows[i].values[c.PROCESS_LABEL];
					var state = data.rows[i].values[c.PROCESS_INSTANCE_STATUS];
					var count = data.rows[i].values[c.TOTALCOUNT];
					var percent = data.rows[i].values[c.PERCENTAGE];
					var procId =data.rows[i].values[c.PROCESS_NAME];
					// create the list of distinct states being returned
					if(barSeriesNames.indexOf(state) === -1 ){
						stateMap[state] = barSeriesNames.length ;  //Add the state in stateMap and the index will be the current length of states added i.e first will be 0 , second 1 and so on
						barSeriesNames.push(state);
						barSeriesItems.push([]);
					}
					//create the list of distinct process being returned
					if(barGroups.map(function(e) { return e.id; }).indexOf(procId) === -1){
						barGroups.push({
							name : procName,
							id : procId,
							shortDesc : self.bundle.health.chart.process_id+ " : " + procId
						});
						processes[procId] = {'title' : procName};
					}
					// add the current state and the count info the the process object
					processes[procId][state] = {'COUNT' : count, 'PERCENT' :percent};
				}

				// Now we have the complete process list with all state info
				// Iterate over all the process object
				for (var proc in processes) {
					var process = processes[proc];
					// Iterate over all the sattes for this particular process
					for (var j=0; j<barSeriesNames.length ; j ++ ){
						var state = barSeriesNames[j];
						var stateName = oj.Translations.getTranslatedString(state);
						stateName = stateName ? stateName :state;
						// Check if this process has any instance in this particular state , add the values if it has else add 0
						if( process[state]  != undefined){
							barSeriesItems[stateMap[state]].push({
								y :process[state]['PERCENT'],
								label:process[state]['COUNT'],
								labelPosition:'auto',
								shortDesc: self.bundle.health.chart.state + " : " + stateName +
								"&lt;br/&gt;"+ self.bundle.health.chart.process_name + " : " + process.title +
								"&lt;br/&gt;"+ self.bundle.health.chart.process_id + " : " + proc +
								"&lt;br/&gt;" +	self.bundle.health.chart.no_instances + " : " + process[state]['COUNT'] +
								"&lt;br/&gt;" +	self.bundle.health.chart.percentage + " : " + process[state]['PERCENT'] + "%"
							});
						}else{
							barSeriesItems[stateMap[state]].push({y :0, label:0, labelPosition:'auto'});
						}
					}
				}

				// Create the chart  series using the above data
				for(var i=0 ;i<barSeriesNames.length ; i++){
					var state = barSeriesNames[i];
					stateName = stateName ? stateName :state;
					var stateName = oj.Translations.getTranslatedString(state);
					barSeries.push({name:  stateName, items: barSeriesItems[stateMap[state]] ,color : barsColorArray[state] , id :state});
				}
			}

			// remove overlays for loading
			$('#bpm-dsb-health-chart-overlay').removeClass('bpm-dsb-load-overlay');

			// Populate the chart
			self.barSeriesValue(barSeries);
			self.barGroupsValue(barGroups);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 0){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 0) {
				self.loadData();
			}
		});


		//--------------- Drill down ----------------------

		self.totalDrilldown = function (){
			util.drilldown(self.totalCountURL);
		};

		self.activeDrilldown = function (){
			util.drilldown(self.progressCountURL);
		};

		self.recoverableDrilldown = function (){
			util.drilldown(self.recoverableCountURL);
		};

		self.suspendedDrilldown = function (){
			util.drilldown(self.suspendedCountURL);
		}

		this.handleAttached = function(info)
		{
			// if the param is passed then load the content immediately
			if (params.loadImmediate){
				self.loadData();
			}


			//The DOM is already inserted
			$("#bpm-dsb-health-chart").ojChart({
				"drill": function(event, ui) {
					var processName = '';
					var status ='';
					if(ui['series'])
						status = ui['series'];
					if(ui['group'])
						processName = ui['group'];

					loggerUtil.log(processName + ";" + status);

					if(processName === ''){
						return;
					}
					if (status === ''){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName);
					}
					else if (status === 'ACTIVE'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName+ '&status=OPEN&userRole=USER_ROLE_ADMIN');
					}
					else if(status === 'RECOVERABLE'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName + '&status=FAULTED_RECOVERABLE&userRole=USER_ROLE_ADMIN');
					}
					else if(status === 'SUSPENDED'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName + '&status=SUSPENDED&userRole=USER_ROLE_ADMIN');
					}
				}
			});
		}
	}

	return healthDashboardContainerModel;
});
