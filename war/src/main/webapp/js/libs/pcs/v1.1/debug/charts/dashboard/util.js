/**
 * Created by nisabhar on 6/30/2015.
 */


define([], function () {

	_columnAlias = function(data) {
		if (data.columnsInfo) {
			var ret = {};
			var i;
			for (i = 0; i < data.columnsInfo.length; i++) {
				ret[data.columnsInfo[i].columnName.replace("TASK","PROCESS")] = i;
			}
			return ret;
		}
	};

	// method to create the parameter list for the query
	_paramList= function(chart){
		var param ="";
		var filterPanel = chart.parent.filterPanel;

		if (filterPanel){

			// If the user has not selected all process add the process name in parameter list
			if(!filterPanel.selectedSelectAllProcess) {
				// add  all the processes added
				for (var i = 0; i < filterPanel.selectedProcesses.length; i++) {
					param = param + "&processNames=" + encodeURIComponent(filterPanel.selectedProcesses[i]);
				}
				// if no process is added, then send with empty process name
				if(param === ""){
					param = param + "&processNames=";
				}
			}

			if(filterPanel.selectedAssignees && filterPanel.selectedAssignees.length === 1){
				param = param + "&assigneeType=" + encodeURIComponent(filterPanel.selectedAssignees[0]);
			}

			if (filterPanel.selectedTopN)
				param = param + "&topN=" + filterPanel.selectedTopN;

			if (filterPanel.selectedDateRange)
				param = param + "&daysAgo=" + filterPanel.selectedDateRange;

			if (param.length > 0)
				param = "?" + param.substring(1);
		}
		//loggerUtil.log(param);
		// to make sure ADF session remain active we do this
		_adfProxyCall();
		return param;
	};

	_adfProxyCall = function(url){
		// Let the container handle if container is willing to
		if (typeof doADFProxyCall == 'function') {
			doADFProxyCall(url);
		}
		// else handle ourself
		else{
			if(url) {
				window.location.assign(url);
			}
		}
	};


	_errorHandler = function (jqXHR, customMsg){
		$("#bpm-dsb-error-dialog").ojDialog("open");

		var msg = oj.Translations.getTranslatedString('container.generic_error_msg');

		if(customMsg){
			msg = customMsg;
		}

		else if (jqXHR && jqXHR.status === 401){
			msg= oj.Translations.getTranslatedString('container.access_error_msg');
		}

		$("#bpm-dsb-error-dialog-custom-text").text(msg);

	};

	_queries = {
		//Workload
		WORKLOAD_ANALYSIS_BILLBOARD : "WORKLOAD_ANALYSIS_BILLBOARD",
		// Workload top 10 Task
		OPEN_TASK_ON_TRACK_ANALYSIS_CHART : "OPEN_TASK_ON_TRACK_ANALYSIS_CHART",
		OPEN_TASK_OVER_DUE_ANALYSIS_CHART :"OPEN_TASK_OVER_DUE_ANALYSIS_CHART",
		OPEN_TASK_DUE_SOON_ANALYSIS_CHART : "OPEN_TASK_DUE_SOON_ANALYSIS_CHART",
		// Workload top 10 Assignee
		OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART : "OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART",
		OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART : "OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART",
		OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART: "OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART",
		// Workload bootleneck
		DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP : "DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP",
		DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP : "DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP",
		DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP :"DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP",

		// Health
		PROCESS_HEALTH_BILLBOARD :"PROCESS_HEALTH_BILLBOARD",
		PROCESS_HEALTH_TABLE : "PROCESS_HEALTH_TABLE"

	};


	return {
		columnAlias : _columnAlias,
		queries : _queries,
		paramList : _paramList,
		drilldown : _adfProxyCall,
		errorHandler : _errorHandler
	};
});
