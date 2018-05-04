/**
 * Created by nisabhar on 1/11/2017.
 */

define(['jquery','pcs/data-services/DataServices','pcs/dynamicProcess/model/DpInstance','pcs/dynamicProcess/model/DpExecution' ],
	function($,DataServices, Instance,Execution ) {

		'use strict';
		var resourceUrlConfig = {
				//Instance
				'instance': '/dp-instances/',
				'variableList': '/dp-instances/{id}/variables',
				'variableData': '/dp-instances/{id}/variables/{variableName}',
				'instanceAction': '/dp-instances/{instanceId}',

				//execution
				'executionList': '/dp-executions',
				'executionAction': '/dp-executions/{executionId}',

				//engine
				'processDefinition': '/dp-definitions/{processDefinitionId}',

				//pcs
				'pcsTask': '/tasks/dynamic-process/{executionId}',
				'pcsProcessInstance': '/processes/dynamic-process/{executionId}'
			},

			dataServices = DataServices.getInstance();

		//making it a singleton
		var instance;
		var loggerUtil =  require('pcs/util/loggerUtil');

		function CreateInstance(options) {

			var self = this;
			//Set the resourcebundle
			self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

			var _state = {
				//for the instanceId vvariable
				instanceVariables : {},
				instanceVariableData : {}
			};

			_state.options = options;

			var replacePlaceHolders = function(str, paramsObj) {
				return str.replace(/{\w+}/g,
					function(placeHolder) {
						return paramsObj[placeHolder];
					}
				);
			};


			//Create the error response object with custom error messages
			function createActionErrorResponse(error) {
				var shortMsg, longMsg;
				switch (error.status) {
					case 204:
						shortMsg = self.bundle.pcs.dp.common.ErrMsg204;
						break;
					case 400:
						shortMsg = self.bundle.pcs.dp.common.ErrMsg400;
						break;
					case 403:
						var errmsg = error.responseJSON.message;
						longMsg = errmsg.substring(errmsg.indexOf('Reason:'), errmsg.length);
						shortMsg = self.bundle.pcs.dp.common.ErrMsg403;
						break;
					case 404:
						if(error.responseJSON && error.responseJSON.type && error.responseJSON.type === 'InvalidRequestException'){
							longMsg = self.bundle.pcs.dp.common.ERROR_INVALID_STATE;
						}
						shortMsg = self.bundle.pcs.dp.common.ErrMsg404;
						break;
					case 500:
						longMsg = error.responseJSON.message;
						shortMsg = self.bundle.pcs.dp.common.ErrMsg500;
						break;
					case 0:
						shortMsg = self.bundle.pcs.dp.common.ErrMsg0;
						break;
				}
				return {
					'code': error.status,
					'shortMsg': shortMsg,
					'longMsg': longMsg
				};
			}

			return {
				// get the instance item object
				fetchInstanceItem: function(refresh, id) {
					var url = resourceUrlConfig.instance + id;
					var promise = $.Deferred();

					if (!refresh) {
						promise.resolve(_state.instance);
						return promise;
					}
					var options = {};
					dataServices.get(url, options, 'dp').done(function(data) {

						var instance = new Instance(data);
						//put it in cache
						_state.instance = instance;
						promise.resolve(instance);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				//get the activities list
				fetchExecutionList: function(refresh, params) {
					var url = resourceUrlConfig.executionList;
					var promise = $.Deferred();

					if (!refresh) {
						promise.resolve(_state.executionList);
						return promise;
					}

					var options = {
						queryParams: params
					};
					dataServices.get(url, options, 'dp').done(function(data) {

						var stages = {};
						var executionList = data.items.map(function(item) {
							if(item.activityType === 'stage'){
								stages[item.executionId] = item.activityName;
							}
							return new Execution(item);
						});

						//Add stage name to the activities
						executionList.map(function(item){
							//Get the stageName based on parent id or self executionId
							var stageName = stages[item.getParentProcessActivityInstanceId()] ? stages[item.getParentProcessActivityInstanceId()] : stages[item.getExecutionId()];
							if(stageName){
								item.setStageName(stageName);
							} else {
								item.setStageName('');
							}
						});

						//put it in cache
						_state.executionList = executionList;
						promise.resolve(executionList);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},
				sortExecutionList: function(activities, sortByKey, srtOrder) {
					var promise = $.Deferred();
					var list = activities;

					if (list === undefined) {
						return promise.resolve([]);
					}

					var key;
					if (sortByKey === 'duration') {
						key = 'durationInMillis';
					} else {
						key = sortByKey;
					}

					function sortFunction(a, b) {
						var dir = srtOrder === 'asc' ? -1 : 1;
						if (a.data[key] < b.data[key]) {
							return dir;
						}
						if (a.data[key] > b.data[key]) {
							return -1 * dir;
						}
						return 0;
					}

					list.sort(sortFunction);

					// list.forEach(function(item,index){
					// 	loggerUtil.log(item.data.activityName);
					// });

					promise.resolve(list);
					return promise;
				},

				//Do a client search search of the execution list
				searchExecutionList: function(searchText) {
					var promise = $.Deferred();
					var list = _state.executionList;

					if (list === undefined) {
						return promise.resolve([]);
					}
					var prunedList = [];

					$.each(list, function(index, value) {
						if (value.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
							prunedList.push(value);
						}
					});
					promise.resolve(prunedList);
					return promise;
				},

				// fetch all instance variables
				fetchInstanceVariables:function(refresh,params){
					var url = resourceUrlConfig.variableList;
					url = replacePlaceHolders(url, params);

					var instanceId = params['{id}'];

					var promise = $.Deferred();

					if (!refresh &&  _state.instanceVariables[instanceId]) {
						promise.resolve(_state.instanceVariables[instanceId]);
						return promise;
					}

					var options = {

					};
					dataServices.get(url, options, 'dp').done(function(data) {
						//put it in cache
						_state.instanceVariables[instanceId] = data.items;

						promise.resolve(data.items);

					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				getInstanceVariableData: function(refresh, params) {
					var url = resourceUrlConfig.variableData;
					url = replacePlaceHolders(url, params);

					var instanceId = params['{id}'];
					var variableName = params['{variableName}'];

					var promise = $.Deferred();

					if (!refresh && _state.instanceVariableData[instanceId] && _state.instanceVariableData[instanceId][variableName]) {
						promise.resolve(_state.instanceVariableData[instanceId][variableName]);
						return promise;
					}

					var options = {
						dataType : 'text'
					};

					dataServices.get(url, options, 'dp').done(function(data) {
						//put it in cache
						if (!_state.instanceVariableData[instanceId]) {
							_state.instanceVariableData[instanceId] = {};
						}
						_state.instanceVariableData[instanceId][variableName] = data;

						promise.resolve(data);
					}).fail(function(error) {

						promise.reject(error);
					});
					return promise;
				},

				performActivityAction: function(params, payload) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.executionAction;
					url = replacePlaceHolders(url, params);

					var options = {
						contentType: 'application/json',
						payload: payload
					};
					dataServices.put(url, options, 'dp').done(function(data) {
						promise.resolve(data);
					}).fail(function(error) {
						promise.reject(createActionErrorResponse(error));
					});

					return promise;
				},
				performInstanceAction: function(params, payload) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.instanceAction;
					url = replacePlaceHolders(url, params);

					var options = {
						contentType: 'application/json',
						payload: payload
					};
					dataServices.put(url, options, 'dp').done(function(data) {
						promise.resolve(data);
					}).fail(function(error) {
						promise.reject(createActionErrorResponse(error));
					});

					return promise;
				},
				fetchAssociatedTask: function(params) {
					var promise = $.Deferred();
					var url = resourceUrlConfig.pcsTask;
					url = replacePlaceHolders(url, params);

					var executionId = params['{executionId}'];

					if (_state.associatedTask && _state.associatedTask[executionId]) {
						promise.resolve(_state.associatedTask[executionId]);
						return promise;
					}

					var options = {
						contentType: 'application/json'
					};
					dataServices.get(url, options).done(function(data) {
						if (_state.associatedTask === undefined) {
							_state.associatedTask = {};
						}
						_state.associatedTask[executionId] = data.number;

						promise.resolve(data.number);
					}).fail(function(error) {
						//promise.resolve(200385);
					   promise.reject(error);
					});

					return promise;
				},
				fetchAssociatedProcess: function(params) {
					var promise = $.Deferred();
					var url = resourceUrlConfig.pcsProcessInstance;
					url = replacePlaceHolders(url, params);

					var executionId = params['{executionId}'];

					if (_state.associatedProcess && _state.associatedProcess[executionId]) {
						promise.resolve(_state.associatedProcess[executionId]);
						return promise;
					}

					var options = {
						contentType: 'application/json'
					};
					dataServices.get(url, options, '4.0').done(function(data) {
						if (_state.associatedProcess === undefined) {
							_state.associatedProcess = {};
						}
						_state.associatedProcess[executionId] = data.processId;
						promise.resolve(data.processId);
					}).fail(function(error) {

						// promise.resolve(200307);
						promise.reject(error);
					});

					return promise;
				},
				fetchProcessDefinition: function(refresh, params) {

					var url = resourceUrlConfig.processDefinition;
					url = replacePlaceHolders(url, params);

					var processDefId = params['{processDefinitionId}'];
					var promise = $.Deferred();

					if (!refresh && _state.processDefinition && _state.processDefinition[processDefId]) {
						promise.resolve(_state.processDefinition[processDefId]);
						return promise;
					}

					var options = {};
					dataServices.get(url, options, 'dp').done(function(data) {

						if (_state.processDefinition === undefined) {
							_state.processDefinition = {};
						}
						_state.processDefinition[processDefId] = data;
						promise.resolve(data);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;

				}
			};

		}

		return {
			getInstance: function(options) {
				if (!instance) {
					instance = new CreateInstance(options);
				}
				return instance;
			}
		};

});
