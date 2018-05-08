"use strict";
/**
 * Created by srayker on 12/10/2015.
 */
define(['jquery', 'pcs/charts/visualization/viewModel/util/visualizationUtil'],
	function($, utils){
		var self = this;
		//Object for maintaining all service path information
		var paths = {
			'applicationNameList' : 'ootbqueries/APPLICATION_NAME_LIST',
			'datasources' : 'businessquery-metadata/datasources',
			'columnsListByApp' : 'businessquery-metadata/datasources/{dataSource}/columns?applicationName={appName}',
			'processList' : 'ootbqueries/PROCESS_LABEL_LIST',
			'aggregateOperations' : 'businessquery-metadata/aggregateoperations',
			'comparisonOperators': 'businessquery-metadata/comparisonoperators',
			'businessQuery' : 'businessquery',
			'businessQueries' : 'businessquery-metadata/businessqueries',
			'businessQueryById' : 'businessquery-metadata/businessqueries/{businessQueryId}'
		};

		var authInfo = "";
		var baseRestURL = "";

		// Handle errors during a ajax call
		function ajaxErrorHandler(jqXHR){
			var defaultErrMsg = oj.Translations.getTranslatedString('vis.error_msg.data_fetch_error');
			if(jqXHR.status === 400 || jqXHR.status === 500){
				var respJSON = $.parseJSON(jqXHR.responseText);
				var respMsg = respJSON && respJSON.detail ? respJSON.detail : defaultErrMsg;
				utils.errorHandler('', respMsg);
			} else if (jqXHR.status !== 403 && jqXHR.status !== 404 && jqXHR.status !== 204){
				utils.errorHandler('', defaultErrMsg);
			}
		}

		// wrapper function for HTTP GET
		var doGet = function(url){
			utils.drilldown();
			return doAjax(url, 'GET');
		};

		// wrapper function for HTTP POST
		var doPost = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'POST', payload);
		};

		// wrapper function for HTTP PUT
		var doPut = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'PUT', payload);
		};

		// wrapper function for HTTP DELETE
		var doDelete = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'DELETE', payload);
		};

		//AJAX utility function
		var doAjax = function(url, method, payload){
			var promise =  $.ajax
			({
				type: method,
				url: url,
				data: payload,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', authInfo);
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				dataType: 'json',
				error: function(jqXHR){
					ajaxErrorHandler(jqXHR);
				}
			});
			return promise;
		};

		var replacePlaceHolders = function(str, paramsObj){
			return  str.replace(/{\w+}/g,
				function(placeHolder) {
					return paramsObj[placeHolder];
				}
			);
		};

		//List of services
		var services = {
			setAuthInfo : function(data){
				authInfo = data;
			},
			setBaseRestURL : function(data){
				baseRestURL = data
			},
			getAppNameList : function(){
				var serverPath = baseRestURL + paths.applicationNameList;
				return doGet(serverPath);
			},
			getDataSourceList : function(){
				var serverPath = baseRestURL + paths.datasources;
				return doGet(serverPath);
			},
			getColumnListByApp : function(params){
				var serverPath = baseRestURL + paths.columnsListByApp;
				serverPath = replacePlaceHolders(serverPath, params);
				return doGet(serverPath);
			},
			getProcessList : function(){
				var serverPath = baseRestURL + paths.processList;
				return doGet(serverPath);
			},
			getAggregateOperations : function(){
				var serverPath = baseRestURL + paths.aggregateOperations;
				return doGet(serverPath);
			},
			getComparisonOperators : function(){
				var serverPath = baseRestURL + paths.comparisonOperators;
				return doGet(serverPath);
			},
			getChartData : function(payload){
				var serverPath = baseRestURL + paths.businessQuery;
				return doPost(serverPath, payload);
			},
			getSavedQueries : function(){
				var serverPath = baseRestURL + paths.businessQueries;
				return doGet(serverPath);
			},
			saveQuery : function(payload){
				var serverPath = baseRestURL + paths.businessQueries;
				return doPost(serverPath, payload);
			},
			updateQuery : function(payload, params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doPut(serverPath, payload);
			},
			deleteQuery : function(params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doDelete(serverPath);
			},
			getQuery : function(params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doGet(serverPath);
			}
		};

		return services;
	}
);
