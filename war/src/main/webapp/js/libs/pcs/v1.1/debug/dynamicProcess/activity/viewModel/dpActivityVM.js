/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPDetailService', 'ojs/ojknockout', 'ojs/ojradioset', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'],
    function(oj, ko, $, InstanceDetail) {

        'use strict';

        return function(params, componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');
            var service;
            var element = componentInfo.element;
            self.properties = params;

            //current instanceId
            self.instanceId = ko.observable();

            // for searching
            self.searchText = ko.observable('');

            //available activites list
            self.availableActivities = ko.observableArray([]);

            //running activites list
            self.runningActivities = ko.observableArray([]);

            //completed activites list
            self.completedActivities = ko.observableArray([]);

            //combine list of availblae and running
			self.actionableActivities = ko.observableArray([]);

            //Attribute to hold confirm message
            self.actionConfirmMessage = ko.observable('');

            //attribute to hold pending action
            self.pendingAction = {};

            //attribute to hold long error msg
            self.longErrorMessage = ko.observable();

            //attribute to hold short error msg
            self.shortErrorMessage = ko.observable();

            //attribute to hold if the component is standalone or used inside details
            self.isConsumed = ko.observable(false);

			//Set the resourcebundle
			self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

			//attribute to store currently selected executionId
			self.selectedExecutionId = ko.observable('');


			self.displayTemplate = ko.observable("ALL_ACTIVITIES");

			self.isSearchTxtVisible = ko.observable(false);

			self.availableChecked = ko.observable();
			self.runningChecked = ko.observable();
			self.completedChecked = ko.observable();
			self.activitySortValue = ko.observable();
			self.rawData = [];
			self.activityData = ko.observableArray([]);

            // The props field on context is a Promise. Once that resolves,
            // we can access the properties that were defined in the composite metadata
            // and were initially set on the composite DOM element
            // context.props.then(function(properties) {
            //     self.properties = properties;
            //     self.initContex();
            // });

            self.initContext = function() {
                service = InstanceDetail.getInstance();

                if (self.properties.instanceid === undefined) {
                    return;
                }

                // check if instanceId is observable or plain variables
                if (ko.isObservable(self.properties.instanceid)) {
                    self.instanceId(self.properties.instanceid());
                } else {
                    self.instanceId(self.properties.instanceid);
                }

                //check if instanceId is passed or not
                if (self.instanceId() === '') {
                    return;
                }

                //set the param about how the component is being used
                if (self.properties.consumed) {
                    self.isConsumed(self.properties.consumed);
                }


                if (self.properties.activities) {
                    if (ko.isObservable(self.properties.activities)) {
                        self.populateData(self.properties.activities());
                    } else {
                        self.populateData(self.properties.activities);
                    }
                } else {
                    self.fetchActivitiesList();
                }
            };


            //Handle error from rest api calls
            //Fire Error Event to handle errors at the top level
            function handleError(error) {
                self.shortErrorMessage(error.shortMsg);
                self.longErrorMessage(error.longMsg);
                $('#pcs-dp-act-err-dialog', element).ojDialog('open');
            }

            //Close the error dialog
            self.closeDialog = function() {
                $('.pcs-dp-dialog').ojDialog('close');
            };


            //Method to populate  actvities data
            self.populateData = function(activity) {
            	//Prepare data for all activities view
				prepareData(activity);
                self.availableActivities.removeAll();
                self.runningActivities.removeAll();
                self.completedActivities.removeAll();
				self.actionableActivities.removeAll();

                if (activity === undefined) {
                    return;
                }
                $.each(activity, function(index, item) {
                    var state = item.getState();
                    if (item.getActivityType() === 'milestone') {
                        return true;
                    }
                    if (state === 'AVAILABLE' || state === 'ENABLED' || state === 'DISABLED') {
                    	if(item.getAvailableActions().length > 0){
							self.availableActivities.push(item);
							self.actionableActivities.push(item);
						}

                    }
                    if (state === 'ACTIVE' || state === 'FAILED') {
						if(item.getAvailableActions().length > 0) {
							self.runningActivities.push(item);
							self.actionableActivities.push(item);
						}
                    }
                    if (state === 'COMPLETED' || state === 'TERMINATED') {
                        self.completedActivities.push(item);
                    }
                });
            };

			var prepareData = function(data){
				if(!data || data.length === 0){
					self.activityData([]);
					return;
				}
				self.rawData = data;
				if(!self.availableChecked() && !self.runningChecked() && !self.completedChecked()){
					//Very first time set the default values of filters
					//Set default filter value
					self.availableChecked(true);
					self.runningChecked(true);
					self.completedChecked(false);
					//Sort the filtered data based on Status
					self.activitySortValue('status');
				} else {
					self.activityData([]);
					//Whenever data is refreshed update the data
					filterActivityData('available', self.availableChecked());
					filterActivityData('running', self.runningChecked());
					filterActivityData('completed', self.completedChecked());
					sortActivityData(self.activitySortValue());
				}
			};

			//subscribe to changes in available filter and filter activity data accordingly
			var availableCheckedSub = self.availableChecked.subscribe(function(newValue){
				filterActivityData('available', newValue);
				sortActivityData(self.activitySortValue());
			});
			//subscribe to changes in running filter and filter activity data accordingly
			var runningCheckedSub = self.runningChecked.subscribe(function(newValue){
				filterActivityData('running', newValue);
				sortActivityData(self.activitySortValue());
			});
			//subscribe to changes in completed filter and filter activity data accordingly
			var completedCheckedSub = self.completedChecked.subscribe(function(newValue){
				filterActivityData('completed', newValue);
				sortActivityData(self.activitySortValue());
			});
			//subscribe to changes in activity sort value and sort activity data accordingly
			var activitySortValueSub = self.activitySortValue.subscribe(function(newValue){
				 sortActivityData(newValue);
			});

			//Filter the activity data based on selected filter value
			function filterActivityData(filter, isChecked){
				if(isChecked){
					//Add items to activity list when checked
					var checkedData = self.rawData.filter(function(item){
						//Skip milestone data
						if (item.getActivityType() === 'milestone') {
							return false;
						}
						//Skip non actionable activities
						if(item.getAvailableActions() && item.getAvailableActions().length <= 0){
							return false;
						}
						var state = item.getState();
						switch (filter){
							case 'available':
								return (state === 'AVAILABLE' || state === 'ENABLED' || state === 'DISABLED');
								break;
							case 'running':
								return (state === 'ACTIVE' || state === 'FAILED');
								break;
							case 'completed':
								return (state === 'COMPLETED' || state === 'TERMINATED');
								break;
						}
					});
					self.activityData(self.activityData().concat(checkedData));
				}else{
					//Remove items from activity list when unchecked
					var uncheckedData = self.activityData().filter(function(item){
						var state = item.getState();
						var retVal = true;
						switch (filter){
							case 'available':
								if (state === 'AVAILABLE' || state === 'ENABLED' || state === 'DISABLED'){
									retVal = false;
								}
								break;
							case 'running':
								if (state === 'ACTIVE' || state === 'FAILED'){
									retVal = false
								}
								break;
							case 'completed':
								if (state === 'COMPLETED' || state === 'TERMINATED'){
									retVal = false;
								}
								break;
						}
						return retVal;
					});
					self.activityData(uncheckedData ? uncheckedData : self.activityData());
				}
			}

			//Sort the activity data based on selected sort value
			function sortActivityData(sort){
				self.activityData.sort(function(a, b){
					var aData;
					var bData;
					switch(sort){
						case 'status':
							aData = a.getWeightage();
							bData = b.getWeightage();
							break;
						case 'stage':
							aData = a.getStageName();
							bData = b.getStageName();
							break;
					}
					if(aData > bData){
						return 1;
					}
					if(aData < bData){
						return -1;
					}
					return 0;
				});
			}

            //method to get the actviites list
            self.fetchActivitiesList = function() {
                var promise = $.Deferred();
                var param = {
                    'processInstanceId': self.instanceId()
                };
                service.fetchExecutionList(true, param).then(function(data) {
                    // loggerUtil.log(data);
                    self.populateData(data);
                    promise.resolve();
                }, function(rejected) {
                    self.showErrorRegion();
                });
                return promise;
            };


            /**
             * When the rest call fails
             */
            self.showErrorRegion = function() {
                $('#pcs-dp-act-error', element).show();
                $('#pcs-dp-act-accordion', element).hide();
            };


            // //Create the Refresh Event params data
            // function getRefreshEventParams(executionId, action) {
            //     //loggerUtil.log('firing event for refreshing data');
            //     return {
            //         'bubbles': true,
            //         'detail': {
            //             'executionId': executionId,
            //             'action': action
            //         }
            //     };
            // }

            function getConfirmationMsg(actionObject) {

                var msg ;
				if (actionObject.action === 'complete'){
					msg = self.bundle.pcs.dp.activity.forceCompleteMsg;
				}else{
					msg = self.bundle.pcs.dp.activity.actionConfirmMsg;
				}

                msg = msg.replace('{activity}', actionObject.activityName);
                msg = msg.replace('{actionType}', actionObject.actionDisplayName.toLowerCase());

                return msg;
            }


			/**
			 * Function called when action is clicked in the UI from menu
			 * @param data
			 * @param event
			 */
			self.performActivityActionSelection = function(actionObject, event) {
				var executionId = actionObject.executionId;
				var action = actionObject.action;

				if (action === 'drilldown'){
					var activity ={};
					$.each(self.actionableActivities(), function(index, item) {
						if(item.getExecutionId() === executionId){
							activity = item;
							return false;
						}
					});
					self.drillDown(activity);
				}else{
					self.performActivityAction(actionObject, event);
				}
			},

			/**
			 * Function called when action is clicked in the UI
             * @param data
             * @param event
             */
            self.performActivityAction = function(actionObject, event) {
                loggerUtil.log('performing action - ' + actionObject);

                // SHow message dialog containor
                if (actionObject.action === 'manual-start' || actionObject.action === 'complete') {
                    //set the pending action
                    self.pendingAction = actionObject;
                    self.actionConfirmMessage(getConfirmationMsg(actionObject));

                    $('#pcs-dp-act-confirm-dialog', element).ojDialog('open');

                } else {
                    self.handleActivityAction(actionObject);
                }

            };


            //Close the confirm dialog and execute action
            self.confirmActivityAction = function() {
                self.handleActivityAction(self.pendingAction);
                self.closeDialog();
            };


            /**
             * Function which perform the action on the backend
             * @param executionId
             * @param action
             */
            self.handleActivityAction = function(actionObject) {
				//Start the loading indicator
				$('#pcs-dp-act-overlay', element).addClass('pcs-common-load-overlay');

                var payload = {
                    action: actionObject.action
                };
                service.performActivityAction({
                    '{executionId}': actionObject.executionId
                }, payload).then(function() {

					//stop the loading indicator
					$('#pcs-dp-act-overlay', element).removeClass('pcs-common-load-overlay');

                    //Check if parent will handle the refresh
                    if (self.isConsumed()) {
                       // do nothing , parent will handle it
                    } else {
                        //handle in the component itself
                        self.fetchActivitiesList();

                    }

                    var params = {
						'bubbles': true,
						'detail': actionObject
					};

					// fire event
					element.dispatchEvent(new CustomEvent('dpactivity:actionPerformed', params));

                }).fail(function(error) {
					//stop the loading indicator
					$('#pcs-dp-act-overlay', element).removeClass('pcs-common-load-overlay');

					//Check if parent will handle the refresh
					if (self.isConsumed()) {
						// do nothing , parent will handle it
					} else {
						//handle in the component itself
						handleError(error);
					}

					actionObject.shortErrorMessage = error.shortMsg;
					actionObject.longErrorMessage =error.longMsg;
					var params = {
						'bubbles': true,
						'detail': actionObject
					};
					element.dispatchEvent(new CustomEvent('dpactivity:actionError', params));

                });
            };


            self.selectActionableActivity = function (data,event){
            	self.selectedExecutionId (data.getExecutionId());
			};

            /**
             * method to call when refresh icon is clicked
             */
            self.onRefreshBtnClick = function() {
                self.fetchActivitiesList();
				// fire event
				var params = {
					'bubbles': true
				};
				element.dispatchEvent(new CustomEvent('dpactivity:refreshData', params));
            };

            //method when user wants to drill to  activity
            self.drillDown = function(data) {
                var params = {
                    'bubbles': true,
                    'detail': {
                        'title': data.getActivityName(),
                        //'taskNumber' : data.geTaskId(), not pppulates , fetch from executionID
                        'id': data.getId(),
						'activityId': data.getActivityId(),
                        'type': data.getActivityType(),
                        'executionId': data.getExecutionId()
                    }
                };
                // loggerUtil.log('firing event for drilldown');
                element.dispatchEvent(new CustomEvent('dpactivity:drilldown', params));
            };


            //method to search as soon as user type
            function searchActivitiesList(searchtext) {
                var promise = $.Deferred();
                service.searchExecutionList(searchtext).then(function(data) {
                    // loggerUtil.log(data);
                    self.populateData(data);
                    promise.resolve();
                });
                return promise;
            }

            //method to search as soon as user type
            self.searchTextSubscription = self.searchText.subscribe(function(newValue) {
                searchActivitiesList(newValue);
            });


            //subscribe to changes in activity list
            if (self.properties.activities && ko.isObservable(self.properties.activities)) {
                self.activitiesSubscription = self.properties.activities.subscribe(function(newValue) {
                    self.populateData(newValue);
                });
            }

			//subscribe to activity selection
			if (self.properties.selectedexecutionid && ko.isObservable(self.properties.selectedexecutionid)) {
				self.selectedExecutionIdSubscription = self.properties.selectedexecutionid.subscribe(function(newValue) {
					self.selectedExecutionId(newValue);
				});
			}


            self.bindingsApplied = function() {
                //temp for Knockoutcomponet
                self.initContext();

                // element.addEventListener('instanceid-changed', self.instanceIdChanged);
                // element.addEventListener('activities-changed',self.activitiesChanged);
            };

            //Method called when instanceid change
            // self.instanceIdChanged = function(event) {
            //     var newVal = event.detail.value;
            //     self.instanceId(newVal);
            //     if (self.properties.activities) {
            //         // loggerUtil.log('do nothing');
            //         //do nothing
            //     } else {
            //         self.fetchActivitiesList();
            //     }
            // };

            //Method called when activities change
            //self.activitiesChanged = function(event){
            //    var newVal = event.detail.value;
            //    self.populateData(newVal);
            //};

            // Public method to modify activity list
            // self.modifyActivityList = function(activityList) {
            //     // loggerUtil.log('modifying activities');
            //     self.populateData(activityList);
            // };


            self.onCloseBtnClick = function() {
                var params = {
                    'bubbles': true,
                    'detail': {
                        'instanceId': self.instanceId()
                    }
                };
                // loggerUtil.log('firing event for drilldown');
                element.dispatchEvent(new CustomEvent('dpactivity:close', params));
            };

			self.onSearchBtnClick = function(data, event){
				self.isSearchTxtVisible() ? self.isSearchTxtVisible(false) : self.isSearchTxtVisible(true);
				if(!self.isSearchTxtVisible()){
					//Updating the observable doesnt clear text for rawValue, hence use OJ to set value
					$('#pcs-dp-act-filter-input', element).ojInputText({'value': ''});
					$('#pcs-dp-act-search', element).toggleClass('pcs-dp-act-search-visible');
				}else{
					$('#pcs-dp-act-search', element).toggleClass('pcs-dp-act-search-visible');
				}
			};


            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function() {
                loggerUtil.log('dispose in dp activity');
                self.searchTextSubscription.dispose();
                if (self.activitiesSubscription) {
                    self.activitiesSubscription.dispose();
                }
                if(self.selectedExecutionIdSubscription){
                	self.activitiesSubscription.dispose();
				}
				if(availableCheckedSub){
					availableCheckedSub.dispose();
				}
				if(runningCheckedSub){
					runningCheckedSub.dispose();
				}
				if(completedCheckedSub){
					completedCheckedSub.dispose();
				}
				if(activitySortValueSub){
					activitySortValueSub.dispose();
				}

                //De-Subscribe to the events
            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
