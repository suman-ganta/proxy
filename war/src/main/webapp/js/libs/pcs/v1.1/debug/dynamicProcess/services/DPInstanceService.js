/**
 * Created by nisabhar on 1/4/2017.
 */

define(['jquery','pcs/data-services/DataServices','pcs/dynamicProcess/model/DpInstance', 'pcs/dynamicProcess/model/DpDefinition'],
	function($,DataServices, Instance , Definition) {

		'use strict';
		var resourceUrlConfig = {
				'instanceList': '/dp-instances',
				'processDefinitions': '/dp-definitions'
			},

			dataServices = DataServices.getInstance();

		//making it a singleton
		var instance;

		function CreateInstance(options) {
			var _state = {};
			_state.options = options;
			_state.processDefinitionsList = {};


			/*
					var dummydata = [{
							activityName: 'Compact Auto Rental request for  Jane Austen',
							id: '1001',
							application: 'Auto Claim',
							colorCode: 'green',
							initials: 'AC',
							activityDescription: 'New auto claim request, raised whenever there is an incidence',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'Mark Luther'
						},
						{
							activityName: 'Home Loan request for  John Steinback',
							id: '1002',
							application: 'Home Loan',
							colorCode: 'blue',
							initials: 'HL',
							activityDescription: 'New home claim request, raised whenever someone come for Loan',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'james Cooper'
						},
						{
							activityName: 'Auto Claim request for  Jack London',
							id: '1003',
							application: 'Auto Claim',
							colorCode: 'green',
							initials: 'AC',
							activityDescription: 'New auto claim request, raised whenever there is an incidence',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'Mark Luther'
						},
						{
							activityName: 'Home Loan request for  John Steinback',
							id: '1004',
							application: 'Home Loan',
							colorCode: 'blue',
							initials: 'HL',
							activityDescription: 'New home claim request, raised whenever someone come for Loan',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'james Cooper'
						},
						{
							activityName: 'Auto Claim request for Agatha Christie',
							id: '1005',
							application: 'Auto Claim',
							colorCode: 'green',
							initials: 'AC',
							activityDescription: 'New auto claim request, raised whenever there is an incidence',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'Mark Luther'
						},
						{
							activityName: 'Home Loan request for  William Shakespeare',
							id: '1006',
							application: 'Home Loan',
							colorCode: 'blue',
							initials: 'HL',
							activityDescription: 'New home claim request, raised whenever someone come for Loan',
							state: 'Active',
							createTime: 'Thursday 16th November 2016',
							createUserId: 'james Cooper'
						}
					];
			*/

			return {
				//Do a client search search of the instance list
				searchInstanceList: function(searchText) {
					var promise = $.Deferred();
					var list = _state.instanceList;

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
				// Do a server call to get the list
				fetchInstanceList: function(refresh, params) {
					var url = resourceUrlConfig.instanceList;
					var promise = $.Deferred();

					if (!refresh) {
						promise.resolve(_state.instanceList);
						return promise;
					}
					var options = {
						queryParams: params
					};
					dataServices.get(url, options, 'dp').done(function(data) {

						var instanceList = data.items.map(function(item) {
							return new Instance(item);
						});

						//put it in cache
						_state.instanceList = params.aggregateInstances ? _state.instanceList.concat(instanceList) : instanceList;
						promise.resolve(instanceList);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				fetchProcessDefinitions: function(refresh, allowedAction) {

					if (!allowedAction){
						allowedAction = 'read';
					}

					var url = resourceUrlConfig.processDefinitions + '?allowedAction=' + allowedAction;

					var promise = $.Deferred();

					if (!refresh && _state.processDefinitionsList && _state.processDefinitionsList[allowedAction]) {
						promise.resolve(_state.processDefinitionsList[allowedAction]);
						return promise;
					}


					var options = {};
					dataServices.get(url, options, 'dp').done(function(data) {

						var definitionsList = data.items.map(function(item) {
							return new Definition(item);
						});

						_state.processDefinitionsList[allowedAction] = definitionsList;
						promise.resolve(definitionsList);

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
