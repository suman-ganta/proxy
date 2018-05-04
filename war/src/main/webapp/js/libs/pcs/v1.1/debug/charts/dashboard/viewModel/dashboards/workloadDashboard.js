/**
 * Created by nisabhar on 6/12/2015.
 */

define(['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util','ojs/ojtreemap' ,'ojs/ojlegend', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function workloadDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// hold the instance of dashboardContainer

		// Rest related parameters
		self.baseRestUrl = this.parent.baseRestUrl;
		self.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		self.authInfo =this.parent.authInfo; // Login credentials

		//---------------------- data Type----------------------------------------
		self.dataType = ko.observable("top10_by_task");

		self.dataTypeRadios = [
			{id: 'top10_by_task', label: self.bundle.workload.type.top10_by_task},
			{id: 'top10_by_assignee', label: self.bundle.workload.type.top10_by_assignee},
			{id: 'bottleneck_by_process', label: self.bundle.workload.type.bottleneck_by_process},
			{id: 'bottleneck_by_task', label: self.bundle.workload.type.bottleneck_by_task},
			{id: 'bottleneck_by_assignee', label: self.bundle.workload.type.bottleneck_by_assignee}
		];

		self.handleDataTypeChange = function(event, ui) {
			//set the tab info in parent which is used by filter panel
			self.parent.workloadSubTab(self.dataType());

			//Load chart data
			self.loadChartData();
		};


		//---------Count related bindings-------------------------
		self.openCount = ko.observable(0);  // No of open task
		self.onTrackCount = ko.observable(0);  // No of active task
		self.dueCount = ko.observable(0);  //No.of recoverable task
		self.overdueCount = ko.observable(0);  // No.of suspended task


		//--------Top 10 Chart data bindings--------------------------------------
		self.barSeriesValueOnTrack = ko.observableArray();
		self.barGroupsValueOnTrack = ko.observableArray();

		self.barSeriesValueDueWeek = ko.observableArray();
		self.barGroupsValueDueWeek = ko.observableArray();

		self.barSeriesValueOverdue = ko.observableArray();
		self.barGroupsValueOverdue = ko.observableArray();

		var chartDatatype = {
			ON_TRACK :1,
			DUE_SOON :2,
			OVER_DUE :3
		};


		//--------Bottleneck Treemap data bindings--------------------------------------
		var handler = new oj.ColorAttributeGroupHandler();
		//handler.addMatchRule('0','#990000');
		//handler.addMatchRule('1', '#6E8992');
		//handler.addMatchRule('2', '#7B9AA4');
		//handler.addMatchRule('3', '#89ABB6');
		//handler.addMatchRule('4', '#97BCC8');
		//handler.addMatchRule('5','#A5CDDB');
		//handler.addMatchRule('6','#B2DEED');
		//handler.addMatchRule('7','#C0EFFF');
		//handler.addMatchRule('8','#D0FFFF');
		handler.addMatchRule('on_track','#bde2a0');
		handler.addMatchRule('due', '#FFF2CC');
		handler.addMatchRule('overdue', '#f0a7a8');


		// Empty , ON_TRACK , DUE_SOON , OVER_DUE
		var top10ColorPalette =[
			["","",""],
			["#38761d","#FFF2CC","#f0a7a8"],
			["#bde2a0","#bf9000","#f0a7a8"],
			["#bde2a0","#FFF2CC","#990000"]
		];

		var treeMapDatatype = {
			PROCESS :1,
			TASK :2,
			ASSIGNEE :3
		};

		//var legendSections = [{items : [
		//	{text : oj.Translations.getTranslatedString('workload.legend.lt_0'),
		//		color : handler.getValue('0')},
		//	{text :  oj.Translations.getTranslatedString('workload.legend.0_to_1'),
		//		color : handler.getValue('1')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.1_to_2'),
		//		color : handler.getValue('2')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.2_to_3'),
		//		color : handler.getValue('3')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.3_to_4'),
		//		color : handler.getValue('4')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.4_to_5'),
		//		color : handler.getValue('5')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.5_to_6'),
		//		color : handler.getValue('6')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.6_to_7'),
		//		color : handler.getValue('7')},
		//	{text :oj.Translations.getTranslatedString('workload.legend.gt_7'),
		//		color : handler.getValue('8')}
		//
		//]}];

		self.nodeValues = ko.observableArray([]);
		//self.legendSections =ko.observableArray(legendSections);


		// --------------- Methods -----------
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			return util.paramList(self);
		};

		//------------------ Load Methods -------------------

		// Main method which loads all the data for this page
		self.loadData = function() {
			//Load count data
			self.load(util.queries.WORKLOAD_ANALYSIS_BILLBOARD +self.paramList(),self.populateWorkloadBillboardData );

			//Load chart data
			self.loadChartData();
		};

		self.loadChartData = function(){
			if(self.dataType() == 'bottleneck_by_process' || self.dataType() == 'bottleneck_by_task' || self.dataType() == 'bottleneck_by_assignee' ){
				$("#bpm-dsb-wkld-treemap-container").show();
				$("#bpm-dsb-wkld-chart-container").hide();
				self.loadBottleneckData();
			}
			else{
				$("#bpm-dsb-wkld-treemap-container").hide();
				$("#bpm-dsb-wkld-chart-container").show();
				self.loadTop10Data();
			}
		};

		// Primary function for loading top10 data to display
		self.loadTop10Data = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-wrkld-chart-ontrack-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-wrkld-chart-due-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-wrkld-chart-overdue-overlay').addClass('bpm-dsb-load-overlay');

			// Queries for data by Assignee
			if(self.dataType() === 'top10_by_assignee'){
				self.load(util.queries.OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.ON_TRACK);
				self.load(util.queries.OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.OVER_DUE);
				self.load(util.queries.OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.DUE_SOON);
			}
			// Queries for data by TAsks
			else if(self.dataType() === 'top10_by_task'){
				self.load(util.queries.OPEN_TASK_ON_TRACK_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.ON_TRACK);
				self.load(util.queries.OPEN_TASK_OVER_DUE_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.OVER_DUE);
				self.load(util.queries.OPEN_TASK_DUE_SOON_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.DUE_SOON);
			}
		};

		// Primary function for loading bottleneck data to display
		self.loadBottleneckData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-wkld-bottleneck-treemap-overlay').addClass('bpm-dsb-load-overlay');

			if(self.dataType() === 'bottleneck_by_process') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP + param,self.populateBottleneckData ,treeMapDatatype.PROCESS );
			}
			else if(self.dataType() === 'bottleneck_by_task') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP + param, self.populateBottleneckData, treeMapDatatype.TASK);
			}
			else if(self.dataType() === 'bottleneck_by_assignee') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP + param, self.populateBottleneckData, treeMapDatatype.ASSIGNEE);
			}

			// populate the legend section
			//self.legendSections(legendSections);
		};


		// Method to do the Rest call, takes a callback function and its parameter which is called when Rest call is  a success
		self.load= function(query, populate,parameter){
			var url = self.restEndPoint + query;
			$.ajax
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
					populate(json,parameter);
				},
				error: function ( jqXHR) {
					populate(null,parameter);
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in load -' + query);
				}
			});
		};


		//------------------ Pouplate Methods -------------------
		self.populateWorkloadBillboardData = function(data){
			if(data && data.rows){
				var c = util.columnAlias(data);
				var row = data.rows[0]; // all the data is in the first row

				self.openCount(row.values[c.TOTAL_OPEN]+0);
				self.onTrackCount(row.values[c.TOTAL_OPEN_AND_NOT_DUE_SOON]+0);
				self.dueCount(row.values[c.TOTAL_DUE_SOON]+0);
				self.overdueCount(row.values[c.TOTAL_OVERDUE]+0);
			}

		};

		// Data columns - "TASK_LABEL" , "TOTAL_ON_TRACK","TOTAL_DUE_SOON","TOTAL_OVERDUE"
		self.populateTop10ChartData = function(data,type){
			var barGroups = [];     //["Process 1","Process 2","Process 3","Process 4","Process 5"];
			var typeSize = 3;  // On track/ Overdue / Due Soon
			var barSeriesItems = [];  //{y :1, label :1}
			var barSeries = [];  // [ {items: [{y :1, label :1}, {y :4, label :4},{y :2, label :2},{y :7, label :7},{y :2, label :2}]}];
			var barSeriesNames =  [ self.bundle.workload.billboard.on_track,self.bundle.workload.billboard.due_soon,self.bundle.workload.billboard.overdue];
			var color = top10ColorPalette[type];

			if(data && data.rows){

				// populae the 3 states items
				for(var i=0 ;i<typeSize ; i++){
					barSeriesItems.push([]);
				}
				// Get the count for each process instance in each state
				// Outer loop iterates of each row of data
				// Iner loop iterates for each state for a particluar row
				for(var i=0 ;i< data.rows.length ; i++){
					barGroups.push(data.rows[i].values[0]);
					for(var j=0 ;j<typeSize ; j++) {
						var val = data.rows[i].values[j+1];
						barSeriesItems[j].push({y: val, label: "" + val,
							shortDesc: "&lt;b&gt;" + val + " " + barSeriesNames[j]  , labelPosition:'auto'});
					}
				}
				// Create the X-axis by iterating over different state
				for(var i=0 ;i<typeSize ; i++){

					// make the major state visible and other 2 satte hidden by default . USer can show them
					// By selecting it from the legend
					// For ON_Track show 1sst , For Due Soon Show 2nd and for overdue show 3rd
					var visibility = "hidden";
					if(i+1 == type){
						visibility = "visible";
					}
					barSeries.push({name: barSeriesNames[i], items: barSeriesItems[i], color :color[i],  visibility: visibility});
				}
			}
			if(type === chartDatatype.ON_TRACK ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-ontrack-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-ontrack");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueOnTrack(barSeries);
				self.barGroupsValueOnTrack(barGroups);
			}
			else if(type === chartDatatype.DUE_SOON ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-due-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-due");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueDueWeek(barSeries);
				self.barGroupsValueDueWeek(barGroups);
			}
			else if(type === chartDatatype.OVER_DUE ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-overdue-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-overdue");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueOverdue(barSeries);
				self.barGroupsValueOverdue(barGroups);
			}
		};

		//By process --- {"POCESS_LABEL","TITLE","ASSIGNEE_DISP_NAME","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2","BAM_GROUPING_3",
		//By Assignee ----"ASSIGNEE_DISP_NAME","TITLE","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2",
		//By Taskk --- "TITLE","ASSIGNEE_DISP_NAME","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2",
		self.populateBottleneckData = function(data,type){
			if(data && data.rows && data.rows.length >0 ){
				var c = util.columnAlias(data); // column name- index alias
				var processTree = createNode("Process",0, 1 ,0,1);
				for(var i=0 ;i< data.rows.length ; i++){
					var level = 0;  // to hold what level the current node is

					var g1= data.rows[i].values[c.BAM_GROUPING_1];
					var g2= data.rows[i].values[c.BAM_GROUPING_2];
					var g3= data.rows[i].values[c.BAM_GROUPING_3];
					if (type === treeMapDatatype.PROCESS){
						var lev =  g1 + g2 + g3; // get the current level , Process will be 2 , task will be 1 , assigness will be 0
						level = 2-lev;  //  Reversing the order
					}else{
						var lev =  g1 + g2; // get the current level task will be 1 , assigness will be 0  OR  assigness will be 1 , task will be 0
						level = 1-lev; //  Reversing the order
					}
					var depth = level;  // To hold at what depth we are at currently
					appendChildNodes(processTree, data.rows[i] ,level,depth, c.AVG_DAYS_UNTIL_DUE_DATE, c.TOTALCOUNT,type);
				}
				self.nodeValues([processTree]);
			}else{
				self.nodeValues([]);
			}
			// remove overlays for loading
			$('#bpm-dsb-wkld-bottleneck-treemap-overlay').removeClass('bpm-dsb-load-overlay');
		};

		// ---- helper methods for Bottle neck Treemaps----------------------

		// Method to create a node of the tree map
		// Calculate lebel by checking the type and current level
		function createNode(title, days, count,level,type) {
			var quartile = '8';
			if(days){
				days = +days.toFixed(2);
			}
			var dateString = days ? days : 'N.A';

			var label = "";
			if(type === treeMapDatatype.PROCESS){
				label = level === 0 ? self.bundle.workload.treemap.process : level ===1 ?  self.bundle.workload.treemap.task :  self.bundle.workload.treemap.assignee;
			}else if(type === treeMapDatatype.TASK){
				label = level === 0 ?  self.bundle.workload.treemap.task : self.bundle.workload.treemap.assignee;
			}else{
				label = level === 1 ?   self.bundle.workload.treemap.task : self.bundle.workload.treemap.assignee;
			}

			//if (days < 0) // 1st quartile
			//	quartile = '0';
			//else if (days >= 0 && days <1)
			//	quartile = '1';
			//else if (days >= 1 && days <2)
			//	quartile = '2';
			//else if (days >= 2 && days <3)
			//	quartile = '3';
			//else if (days >= 3 && days <4)
			//	quartile = '4';
			//else if (days >= 4 && days <5)
			//	quartile = '5';
			//else if (days >= 5 && days <6)
			//	quartile = '6';
			//else if (days >= 6 && days <7)
			//	quartile = '7';

			if (days < 0) // 1st quartile
				quartile = 'overdue';
			else if (days > 0 && days <7)
				quartile = 'due';
			else
				quartile = 'on_track';


			return {label: title,
				id: title,
				value: count,
				color: getColor(quartile),
				nodes : [],
				shortDesc: label + " : " + title +
				"&lt;br/&gt;"+ self.bundle.workload.treemap.sizeLabel + " : " + count +
				"&lt;br/&gt;" +  self.bundle.workload.treemap.colorLabel + " : " + dateString
			};
		}

		function getColor(quartile) {
			return handler.getValue(quartile);
		}

		// recursive function to insert the node at correct postion of the tree
		// Didn't have much time to write this algo , See if it can be improved performance wise
		function appendChildNodes(parentNode, child,level,depth ,dateIndex , countIndex , type) {
			if (depth === 0){
				// we are at the leaf node , create a node and push it in the parent node list
				var node = createNode(child.values[level],child.values[dateIndex], child.values[countIndex],  level ,type);
				parentNode.nodes.push(node);
			}else{
				// we are not at leaf yet , find the correct new parent from the parentNode child list
				// and pass this node to the new parent to handle
				for (var i=0 ;i<parentNode.nodes.length; i++){
					if (parentNode.nodes[i].id === child.values[level-depth]){
						appendChildNodes(parentNode.nodes[i], child ,level ,depth-1,dateIndex,countIndex, type);
						break;
					}
				}
			}
		}

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 2){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 2) {
				self.loadData();
			}
		});


		this.handleAttached = function(info) {
			//self.loadData();
		}

	}

	return workloadDashboardContainerModel;
});
