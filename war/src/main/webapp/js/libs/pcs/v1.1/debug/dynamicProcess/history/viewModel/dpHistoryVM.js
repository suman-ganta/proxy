/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPDetailService', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojinputtext',
        'ojs/ojarraytabledatasource', 'ojs/ojtoolbar', 'ojs/ojselectcombobox', 'ojs/ojtimeline', 'ojs/ojbutton', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'
    ],
    function(oj, ko, $, InstanceDetail) {
        'use strict';

        return function(params,componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');
            var service;
            var element = componentInfo.element;
            self.properties = params;

            var srtDirection = 'desc';
            self.selectedSort = 'endTime';

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');
            self.sortTitleTxt = ko.observable(self.bundle.pcs.dp.common.desc);
            self.sortListBy = [{
                id: 'activityName',
                label: self.bundle.pcs.dp.history.activityName
            }, {
                id: 'endTime',
                label: self.bundle.pcs.dp.history.endTime
            }, {
                id: 'duration',
                label: self.bundle.pcs.dp.history.duration
            }];
            self.instanceId = ko.observable();
            // List of activities for this process instance
            self.executionList = ko.observableArray([]);
            self.searchText = ko.observable('');
            self.selectedView = ko.observable('list');
            //Attribute to store refresh time
            self.lastRefreshedTime = ko.observable();
			self.hasSearchTxt = ko.observable(false);

			//attribute to hold if the component is standalone or used inside details
			self.isConsumed = ko.observable(false);

            //method to search as soon as user type
            function searchExecutionList(searchtext) {
                var promise = $.Deferred();
                service.searchExecutionList(searchtext).then(function(data) {
					self.populateData(data);
                    promise.resolve();
                });
                return promise;
            }

            // The props field on context is a Promise. Once that resolves,
            // we can access the properties that were defined in the composite metadata
            // and were initially set on the composite DOM element
            // context.props.then(function(properties) {
            //     self.properties = properties;
            //     self.initContex();
            // });

            self.initContext = function(){
                service = InstanceDetail.getInstance();

				if(self.properties.instanceid === undefined){
					return;
				}

				// check if instanceId is observable or plain variables
				if(ko.isObservable (self.properties.instanceid)){
					self.instanceId(self.properties.instanceid());
				}else{
					self.instanceId(self.properties.instanceid);
				}

				//check if instanceId is passed or not
				if(self.instanceId() === ''){
					return;
				}

				//set the param about how the component is being used
				if (self.properties.consumed ){
					self.isConsumed(self.properties.consumed);
				}


				self.dataSource = new oj.ArrayTableDataSource(self.executionList, {
                    idAttribute: 'getId'
                });

                if (self.properties.activities) {
					if(ko.isObservable (self.properties.activities)){
						self.populateData(self.properties.activities());
					}else{
						self.populateData(self.properties.activities);
					}
                } else {
                    self.fetchExecutionList();
                }
            };

            //Method to populate data
            self.populateData = function (activities){
				service.sortExecutionList(activities,self.selectedSort,srtDirection).then(function(data) {

					// loggerUtil.log(data);
					self.populateSortedData(data);
				});
            };

            //method to populate sorted data
			self.populateSortedData = function (activities){
				activities = activities.filter(function(item){
					var x = item.getState() !== 'AVAILABLE' && item.getState() !== 'ENABLED' && item.getState() !== 'DISABLED' ;
					return x;
				});

				//clean old activites
				self.executionList.removeAll();

				var array = self.executionList();
				ko.utils.arrayPushAll(array, activities);
				self.executionList.valueHasMutated();


				self.dataSource = new oj.ArrayTableDataSource(self.executionList, {
					idAttribute: 'getId'
				});

				if ((!activities || activities.length === 0) &&  self.searchText().length ===0){
					$('#pcs-dp-hist-lv-empty-container',element).show();
					$('#pcs-dp-hist-lv-container',element).hide();
				}else{
					$('#pcs-dp-hist-lv-empty-container',element).hide();
					$('#pcs-dp-hist-lv-container',element).show();
				}
			};


            // Public method to modify activity list
            self.activityListModified = function() {
                self.fetchExecutionList();
            };

            //method to get the actviites list
            self.fetchExecutionList = function() {
                var promise = $.Deferred();
                var param = {
                    'processInstanceId': self.instanceId(),
                    'sortBy': self.selectedSort,
                    'sortOrder': srtDirection
                };
                service.fetchExecutionList(true, param).then(function(data) {
                    // loggerUtil.log(data);
                    self.populateSortedData(data);
                    promise.resolve();
                }, function(rejected) {
					self.showErrorRegion();
                });
                return promise;
            };

            self.onDirectionBtnClick = function(data, event) {

				srtDirection = srtDirection === 'asc' ? 'desc' : 'asc';

				//re-populate the data with correct sort
				self.populateData(self.executionList.slice(0));

				$('#pcs-dp-hist-direction-asc-btn', element).toggle();
				$('#pcs-dp-hist-direction-dsc-btn', element).toggle();

            };

            //Event handler for option change of Sort
            //Fires event SortOptionChange
            self.onSortOptionChange = function(event, data) {
                if (data.option === 'value') {
					//re-populate the data with correct sort
					self.populateData(self.executionList.slice(0));
                }
            };

            //method to search as soon as user type
            self.searchTextSubscription =self.searchText.subscribe(function(newValue) {
				searchExecutionList(newValue);
				self.hasSearchTxt(newValue.length > 0);
            });

			self.onSearchClearClick = function(){
				//Updating the observable doesnt clear text for rawValue, hence use OJ to set value
				$('#pcs-dp-hist-search-input', element).ojInputText({'value': ''});
			};

			//subscribe to changes in activity list
			if(self.properties.activities && ko.isObservable(self.properties.activities )){
				self.activitiesSubscription = self.properties.activities.subscribe(function (newValue) {
					self.populateData(newValue);
				});
			}


            self.selectedViewChanged = function(event, data) {
                var listView = $('#pcs-dp-hist-lv-container');
                var processView = $('#pcs-dp-hist-pv-container');
                var timelineView = $('#pcs-dp-hist-tv-container');
                if (data.value === 'process') {
                    listView.hide();
                    processView.show();
                    timelineView.hide();
                } else if (data.value === 'timeline') {
                    listView.hide();
                    processView.hide();
                    timelineView.show();
                } else {
                    listView.show();
                    processView.hide();
                    timelineView.hide();
                }
            };

            self.showAdvanceSearchPopup = function() {
                $('#advanceSearchPopup').ojDialog('open');
                $('#advSearchDialog').css({
                    top: 0
                });
            };

            self.value = ko.observable('Green');


            //method when user wants to drill to  activity
            self.drillDown = function(data) {
                var params = {
                    'bubbles': true,
                    'detail': {
                        'title': data.getActivityName(),
                        //'taskNumber' : data.geTaskId(), not pppulates , fetch from executionID
                        'id': data.getActivityId(),
                        'type': data.getActivityType(),
                        'executionId': data.getExecutionId()
                    }
                };
                // loggerUtil.log('firing event for drilldown');
                element.dispatchEvent(new CustomEvent('dphistory:drilldown', params));
            };


			/**
			 * method to call when refresh icon is clicked
			 */
			self.onRefreshBtnClick = function(){
				self.fetchExecutionList();
			};

			/**
			 * When the rest call fails
			 */
			self.showErrorRegion = function() {
				$('#pcs-dp-hist-error', element).show();
				$('#pcs-dp-hist-lv-container', element).hide();
			};

            self.bindingsApplied = function() {
                //temp for Knockoutcomponet
                self.initContext();

                //TODO:srayker Sort internally , instead of fetching again
                //self.fetchExecutionList();
            };

            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function(){
                loggerUtil.log('dispose in dp history');
                self.searchTextSubscription.dispose();
				if(self.activitiesSubscription){
					self.activitiesSubscription.dispose();
				}

                //De-Subscribe to the events

            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };

    }
);
