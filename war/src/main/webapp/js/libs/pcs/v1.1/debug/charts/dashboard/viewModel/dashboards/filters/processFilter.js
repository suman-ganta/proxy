/**
 * Created by nisabhar on 6/25/2015.
 */

define(['ojs/ojcore', 'knockout', 'pcs/charts/dashboard/util',   'ojs/ojinputnumber','ojs/ojoffcanvas', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojL10n!pcs/resources/nls/dashboardResource'
], function (oj, ko, util) {
	/**
	 * The view model for the main content view template
	 */
	function processFilterModel(params) {
		var self = this;

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of Container

		// ---- bindings for  UI -------
		self.searchText = ko.observable();

		self.processList =	ko.observableArray();  // List of processes to show in UI
		self.actualProcessList = [];  // temp list to hold the all processes names returned by the Rest. used for remove duplicates

		self.processes = ko.observableArray();  // list of currently selected prcocesses

		// Custom Binding for 'ALL' check box , Its checked when all processes are selected, and unchecked if not
		self.selectAllProcess = ko.computed({
			read: function () {
				var isAllSelected = self.processes().length === self.actualProcessList.length;
				return isAllSelected;
			},
			write: function (value) {
				self.processes.removeAll();
				if(value === true){
					for(var i=0 ;i <self.processList().length ;i ++){
						var proc = self.processList()[i];
						self.processes.push(proc);
					}
				}
			}
		});

		self.showSelectAll = ko.computed(function() {

			if (self.processList().length != self.actualProcessList.length){
				return false;
			}
			return true;
		});

		// --- knocut bindings for the filter panel
		self.assignees = ko.observable(["Roles and Groups","Users"]);
		self.dateRange = ko.observable(30);
		self.topN = ko.observable(10);

		// The saved values which will be used for creating parameter list
		self.selectedAssignees = ["Roles and Groups","Users"]; // By default all the assignee is selected
		self.selectedDateRange = 30;			// binding for date range
		self.selectedTopN = 10;		// binding for tpp N
		self.selectedProcesses = [];
		self.selectedSelectAllProcess = true;


		// to refresh the process list
		self.parent.processListChangeSwitch.subscribe(function() {
			self.populateProcessList(self.parent.processData);
		});

		//-- Method to populate Process List
		self.populateProcessList = function(data){
			var isAllSelected = self.selectAllProcess();

			// clean the old list
			self.processList.removeAll();
			self.actualProcessList = [];

			// If user has not altered the selected process , recreate it too
			// else retain the selectedProcessList as the chart data will be according the selected process list
			if  (isAllSelected){
				self.processes.removeAll();
			}

			if(data && data.rows &&  data.rows.length >0){
				for(var i=0 ;i <data.rows.length ;i ++){
					self.actualProcessList.push(data.rows[i].values[0]);
					self.processList.push(data.rows[i].values[0]);
					if  (isAllSelected){
						self.processes.push(data.rows[i].values[0]);
					}
				}
			}
			// copy the local saved process  in saved process object
			self.selectedProcesses = self.processes.slice();

			// Refresh the JEt bindings
			$(".bpm-dsb-processSetId").ojCheckboxset("refresh");
			$(".bpm-dsb-process-list-loading").hide();
		};

		// -- method to search for a process locally
		self.search = function(){
			var key = self.searchText();
			if(key != undefined && key != null){
				key = key.trim().toLowerCase();
				self.processList.removeAll();
				self.processes.removeAll();

				for(var i=0 ;i <self.actualProcessList.length ;i ++){
					if(self.actualProcessList[i].toLowerCase().indexOf(key) !== -1){
						self.processList.push(self.actualProcessList[i]);
					}
				}
				// Refresh the JEt bindings
				$(".bpm-dsb-processSetId").ojCheckboxset("refresh");
			}
		};

		//-- populate the list once Module binding has been applied
		this.handleBindingsApplied = function(info) {
			self.populateProcessList(self.parent.processData);
		};


		self.apply = function(){
			// save the values -
			self.selectedAssignees = self.assignees(); // By default all the assignee is selected
			self.selectedDateRange = self.dateRange();			// binding for date range
			self.selectedTopN = self.topN();
			self.selectedProcesses = self.processes.slice();
			self.selectedSelectAllProcess = self.selectAllProcess();

			self.parent.filterPanel = self ;
			self.parent.apply();
		};

		self.reset= function(){
			self.assignees(self.selectedAssignees);
			self.dateRange(self.selectedDateRange);
			self.topN(self.selectedTopN);
			self.processes.removeAll();
			for(var i=0 ;i <self.selectedProcesses.length ;i++){
				self.processes.push(self.selectedProcesses[i]);
			}
		};

		self.handleAttached = function(info) {
			//add a close listener so when a offcanvas is autoDismissed we can synchronize the page state.
			$("#endDrawer").on("ojclose",
				function () {
					// reset the values
					self.reset();
				});
			// by default populate the filter panel object in parent
			self.parent.filterPanel = self ;
		};



	}

	return processFilterModel;
});
