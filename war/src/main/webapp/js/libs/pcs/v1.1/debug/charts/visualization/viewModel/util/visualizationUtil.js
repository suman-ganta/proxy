/**
 * Created by nisabhar on 11/20/2015.
 */

/**
 * Created by nisabhar on 6/30/2015.
 */


define(['jquery', 'knockout', 'ojL10n!pcs/resources/nls/dashboardResource'], function ($, ko, bundle) {


	var _columnAlias = function(data) {
		if (data.columnsInfo) {
			var ret = {};
			var i;
			for (i = 0; i < data.columnsInfo.length; i++) {
				ret[data.columnsInfo[i].columnName.replace("TASK","PROCESS")] = i;
			}
			return ret;
		}
	};

	var _adfProxyCall = function(url){
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

	var _errorHandler = function (jqXHR, customMsg){
		$("#bpm-dsb-error-dialog").ojDialog("open");

		var msg = bundle.container.generic_error_msg;

		if(customMsg){
			msg = customMsg;
		}

		else if (jqXHR && jqXHR.status === 401){
			msg= bundle.container.access_error_msg;
		}

		$("#bpm-dsb-error-dialog-custom-text").text(msg);

	};


	var _constants ={
		queries : {
			//Custom
			APPLICATION_LIST : "PROCESS_LABEL_LIST"
		},
		dataType : {
			TIMESTAMP : 'TIMESTAMP',
			DATETIME : 'DATETIME',
			INT : 'INT'
		},
		misc : {
			ANY : 'ANY',
			ALL : 'ALL',
			VALUE : 'value',
			VISIBLE : 'visible'
		},
		chartType :{
			BAR : 'bar',
			LINE:'line',
			AREA :'area',
			PIE:'pie',
			LINEWITHAREA:'lineWithArea',
			FUNNEL:'funnel',
			COMBO :'combo'
		},
		columnTypes : {
			ATTRIBUTE : 'ATTRIBUTE',
			DIMENSION : 'DIMENSION',
			MEASURE : 'MEASURE'
		},
		dataSource :{
			PROCESS :'PROCESS',
			ACTIVITY:'ACTIVITY',
			TASK:'TASK',
			ASSIGNMENT:'ASSIGNMENT'
		},
		functionList :{
			SUM:'SUM',
			COUNT:'COUNT',
			AVG:'AVG',
			MIN:'MIN',
			MEDIAN:'MEDIAN',
			MAX:'MAX',
			STDDEV:'STDDEV',
			COUNTDISTINCT:'COUNTDISTINCT',
			VARIANCE:'VARIANCE'
		},
		timeGroups : [
			'YEAR',
			'QUARTER',
			'MONTH',
			'WEEK',
			'DAYOFYEAR',
			'DAYOFMONTH',
			'DAYOFWEEK',
			'HOUR',
			'MINUTE',
			'SECOND'
		],
		lastNDays : {
			'7': '1WEEK',
			'30': '1MONTH',
			'60': '2MONTHS',
			'90': '3MONTHS',
			'180': '6MONTHS',
			'270': '9MONTHS',
			'365': '1YEAR'
		}

	};

	return {
		columnAlias : _columnAlias,
		constants : _constants,
		drilldown : _adfProxyCall,
		errorHandler : _errorHandler,
		refreshAll : function(observableArray, fromArray){
			//push all the items from a array to an observable array and
			//notify the subscribers to the observableArray at the end
			observableArray.valueWillMutate();
			observableArray.removeAll();
			ko.utils.arrayPushAll(observableArray, fromArray);
			observableArray.valueHasMutated();
		},
		addAll : function (observableArray, fromArray){
			//Add all the items from a array to an observable array and
			//notify the subscribers to the observableArray at the end
			observableArray.valueWillMutate();
			ko.utils.arrayPushAll(observableArray, fromArray);
			observableArray.valueHasMutated();
		},
		startsWith : function(str, searchString, position){
			position = position || 0;
			return str.substr(position, searchString.length) === searchString;
		}
	};
});

