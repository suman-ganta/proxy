/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPInstanceService', 'pcs/util/pcsUtil', 'pcs/util/dateUtil',
        'ojs/ojknockout', 'promise', 'ojs/ojbutton', 'ojs/ojlistview', 'ojs/ojinputtext', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
        'ojs/ojarraytabledatasource', 'ojs/ojtoolbar', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker','pcs/pcs.identitybrowser'
    ],
    function(oj, ko, $, InstanceService, pcsUtil, dateUtil) {

        'use strict';

        return function(params, componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            var service;
            var element = componentInfo.element;
			var totRecordsFetched = 0;
			var defaultPageSize = 10;
			var dataArr = [];

			self.firstResult = ko.observable(0);
			self.currentOffset = ko.observable(defaultPageSize);
			self.hasMoreRecs = ko.observable(false);
			self.isMoreClicked = ko.observable(false);

            // Attribute to store search text
            self.searchText = ko.observable('');

            // Attribute to store sortby text
            self.selectedSortBy = ko.observableArray(['createTime']);

            self.selectedSortOrder = ko.observable('desc');

            //Attribute to store selectedstae
            self.selectedStates = ko.observableArray(['ACTIVE']);

			self.viewDataSource = ko.observable();

            //Attribute to store display view
            self.displayView = ko.observable();

            //available process definition to filter
            self.processDefinitionList = ko.observableArray([{
                value: 'ALL',
                label: 'All'
            }]);

            //selectedProcessDef
            self.selectedProcessDef = ko.observableArray(['ALL']);

            //selected Created Before
            self.selectedCreatedBefore = ko.observable();

            //selected Created After
            self.selectedCreatedAfter = ko.observable();

            //selected Created Before
            self.selectedClosedBefore = ko.observable();

            //selected Created After
            self.selectedClosedAfter = ko.observable();

            //selecetd updatedBy
            self.selectedUpdatedBy = ko.observable();

			self.hasSearchTxt = ko.observable(false);

            // list of avialable state for filtering UI
			self.availableStates = [
				{value: 'ACTIVE', label: 'Active'},
				{value: 'COMPLETED',  label: 'Completed'},
				{value: 'TERMINATED',   label: 'Terminated'},
				{value: 'CLOSED',    label: 'Closed'},
				{value: 'ALL', label: 'All'}
			];

			// Key-value pair for state
			self.statesMap = {
				ALL : 'All',
				ACTIVE : 'Active',
				COMPLETED : 'Completed',
				TERMINATED : 'Terminated',
				CLOSED :  'Closed'
			};

			// list of avialable state for sortBy UI
			self.availableSortBy = [
				{value: 'instanceId', label: 'Instance Id'},
				{value: 'createTime',  label: 'Created Date'},
				{value: 'definitionId',   label: 'Process'},
				{value: 'closeTime',    label: 'Closed Date'},
				{value: 'duration',    label: 'Duration'}
			];

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            // attribute to hold what is the current custom filter user has added
            self.selectedFilterCriteria = ko.observableArray([]);

            //Attribute to store filter param
            self.selectedFilterParam = ko.computed(function() {
                var params = {};

                params.aggregateInstances = self.isMoreClicked();
				params.firstResult = self.firstResult();
				params.maxResults = defaultPageSize;
                params.sortBy = self.selectedSortBy();
                params.sortOrder = self.selectedSortOrder();
                var states = self.selectedStates();
                for (var i = 0; states && i < states.length; i++) {
					if (states[i] !== 'ALL') {
						params.state = states[i];
					}
                }

                var processDefinitionIds = self.selectedProcessDef();
                for (var j = 0; processDefinitionIds && j < processDefinitionIds.length; j++) {
                    if (processDefinitionIds[j] !== 'ALL') {
                        params.processDefinitionId = processDefinitionIds[j];
                    }
                }

                if (self.selectedCreatedBefore()) {
                    params.createdBefore = dateUtil.getDateStingInUTCTimezone(self.selectedCreatedBefore());
                }

                if (self.selectedCreatedAfter()) {
                    params.createdAfter = dateUtil.getDateStingInUTCTimezone(self.selectedCreatedAfter());
                }

                if (self.selectedClosedBefore()) {
                    params.closedBefore = dateUtil.getDateStingInUTCTimezone(self.selectedClosedBefore());
                }

                if (self.selectedClosedAfter()) {
                    params.closedAfter = dateUtil.getDateStingInUTCTimezone(self.selectedClosedAfter());
                }

                if(self.selectedUpdatedBy()){
					self.selectedUpdatedBy(getSelectedIdentity());
                	params.updatedBy = self.selectedUpdatedBy();
				}

                loggerUtil.log(params);
                return params;
            });

            function getSelectedIdentity(){
            	var retVal;
				var updatedBy = $('#pcs-dp-list-filter-updatedBy');
				var identityBrowser = updatedBy.find('#identityBrowser');
				if(identityBrowser.length > 0){
					var obj = ko.contextFor(identityBrowser[0]);
					if (obj) {
						var data = obj.$data;
						var objectIDS = data.getUserIDs();
						if (objectIDS.length > 0) {
							params.updatedBy = objectIDS[0];
							retVal = params.updatedBy;
						}
					}
				}
				return retVal;
			}


			/**
			 * clean out all filters to default
			 */
			self.clearFilters = function(){

				self.selectedStates(['ACTIVE']);
				self.selectedProcessDef(['ALL']);
				self.selectedCreatedBefore('');
				self.selectedCreatedAfter('');
				self.selectedClosedBefore('');
				self.selectedClosedAfter('');
				self.selectedUpdatedBy('');
				//Clear the selected value in idbrowser
				var updatedBy = $('#pcs-dp-list-filter-updatedBy');
				var identityBrowser = updatedBy.find('#identityBrowser');
				if(identityBrowser.length > 0){
					var obj = ko.contextFor(identityBrowser[0]);
					if (obj) {
						obj.$data.setValue('');
					}
				}
			};


			/**
			 * Method called from Ui , when user click on Clear
			 */
			self.clearFilterAction = function (){
				// Clean the filter
				self.clearFilters ();
				//recreate filter bar
				self.createFilterBar();
				// refresh list
				self.refreshInstanceList();
			};

			/**
			 * method called when individual filter is removed
			 * @param data
			 * @param event
			 */
			self.removeFilterAction = function (data,event){
				// remove the required filter
				data.clearFunction();
				//recreate filter bar
				self.createFilterBar();
				// refresh list
				self.refreshInstanceList();
			};


			/**
			 * To create the filter bar content
			 */
			self.createFilterBar  = function (){
				self.selectedFilterCriteria.removeAll();

				var states = self.selectedStates();
				for (var i = 0; states && i < states.length; i++) {
					if(states[i] !== 'ACTIVE'){
						self.selectedFilterCriteria.push({
							label : 'State',
							value : self.statesMap[states[i]] ,
							clearFunction : function(){
								self.selectedStates(['ACTIVE']);
								this.disabled.dispose();
							},
							disabled :  ko.computed(function (){
								if (self.selectedClosedBefore()  || self.selectedClosedAfter()){
									return true;
								}
								return false;
							})
						});
					}
				}

				var processDefinitionIds = self.selectedProcessDef();
				for (var j = 0; processDefinitionIds && j < processDefinitionIds.length; j++) {
					var processName = getProcessNameFromId (processDefinitionIds[j]);
					if (processDefinitionIds[j] !== 'ALL') {
						self.selectedFilterCriteria.push({
							label : 'Process',
							value : processName,
							clearFunction : function(){self.selectedProcessDef(['ALL']);},
							disabled : ko.observable(false)
						});
					}
				}

				if (self.selectedCreatedBefore()) {
					self.selectedFilterCriteria.push({
						label : 'Created Before',
						value : self.selectedCreatedBefore(),
						clearFunction : function(){self.selectedCreatedBefore('');},
						disabled : ko.observable(false)
					});
				}

				if (self.selectedCreatedAfter()) {
					self.selectedFilterCriteria.push({
						label : 'Created After',
						value : self.selectedCreatedAfter(),
						clearFunction : function(){self.selectedCreatedAfter('');},
						disabled : ko.observable(false)
					});
				}

				if (self.selectedClosedBefore()) {
					self.selectedFilterCriteria.push({
						label : 'Closed Before',
						value : self.selectedClosedBefore(),
						clearFunction : function(){self.selectedClosedBefore('');},
						disabled : ko.observable(false)
					});
				}

				if (self.selectedClosedAfter()) {
					self.selectedFilterCriteria.push({
						label : 'Closed After',
						value : self.selectedClosedAfter(),
						clearFunction : function(){self.selectedClosedAfter('');},
						disabled : ko.observable(false)
					});
				}

				if (self.selectedUpdatedBy()) {
					self.selectedFilterCriteria.push({
						label : 'Updated By',
						value : self.selectedUpdatedBy(),
						clearFunction : function(){self.selectedUpdatedBy('');},
						disabled : ko.observable(false)
					});
				}

				//loggerUtil.log(self.selectedFilterCriteria());
			};

			function getProcessNameFromId (id){
				var processName;
				$.each(self.processDefinitionList() , function (index,item){
					if (item.value === id){
						processName =item.label;
					}
				});
				return processName;
			}

            function displayViewOnload() {
                var dir = 'LIST'; //window.localStorage['dp-dplist-view'];
                self.displayView(dir);
                if (dir === 'LIST') {
                    $('#pcs-dp-list-lv-wrapper', element).show(('slide', 1000));
                    $('#pcs-dp-list-gv-wrapper', element).hide(('slide', 1000));
                    $('#pcs-dp-list-display-grid-btn', element).show();
                    $('#pcs-dp-list-display-list-btn', element).hide();
                } else {
                    $('#pcs-dp-list-lv-wrapper', element).hide(('slide', 1000));
                    $('#pcs-dp-list-gv-wrapper', element).show(('slide', 1000));
                    $('#pcs-dp-list-display-grid-btn', element).hide();
                    $('#pcs-dp-list-display-list-btn', element).show();
                }
            }

            //Method to launch Advanced Search Dialog
            self.showAdvanceSearchPopup = function() {
                self.populateProcessDefinitions(false);
                $('#pcs-dp-list-advanceSearchPopup', element).ojDialog('open');
            };

			/**
			 * Method to populate process defintiions for filter dialog
			 * @param refresh
			 */
            self.populateProcessDefinitions = function(refresh) {

                service.fetchProcessDefinitions(refresh,'read').then(function(data) {

                    self.processDefinitionList.removeAll();

                    var all = {
                        value: 'ALL',
                        label: 'All'
                    };
                    self.processDefinitionList.push(all);
                    data.forEach(function(item, index) {

						var def = {
							value: item.id,
							label: item.displayName
						};
						self.processDefinitionList.push(def);

                    });

                }, function(rejected) {
                    loggerUtil.log(rejected);
                });
            };

            // Method to change the sort direction
            self.onDirectionBtnClick = function(data) {
                var dir = data.selectedSortOrder();
                if (dir === 'asc') {
                    self.selectedSortOrder('desc');
                } else {
                    self.selectedSortOrder('asc');
                }
				resetQueryOffset();
                //REFETCH LIST
                fetchInstanceList(self.selectedFilterParam()).then(function() {
					showMoreText();
				});
                $('#pcs-dp-list-direction-asc-btn', element).toggle();
                $('#pcs-dp-list-direction-dsc-btn', element).toggle();
            };


            //Method to be called on sort By change
            self.sortByChangedHandler = function(event, data) {
                if (data.option === 'value') {
					resetQueryOffset();
                    //REFETCH LIST
                    fetchInstanceList(self.selectedFilterParam()).then(function() {
						showMoreText();
					});
                }
            };


            //Method to switch display view
            self.switchDisplayView = function(data) {
                var dir = data.displayView();

                if (dir === 'LIST') {
                    self.displayView('GRID');
                    window.localStorage['dp-dplist-view'] = 'GRID';
                } else {
                    self.displayView('LIST');
                    window.localStorage['dp-dplist-view'] = 'LIST';
                }
                $('#pcs-dp-list-lv-wrapper', element).toggle(('slide', 1));
                $('#pcs-dp-list-gv-wrapper', element).toggle(('slide', 1));
                $('#pcs-dp-list-display-grid-btn', element).toggle();
                $('#pcs-dp-list-display-list-btn', element).toggle();
            };

            //Method to drill down to instance details
            self.instanceSelected = function(data, event) {
                var params = {
                    'bubbles': true,
                    'detail': {
                        'instanceId': data.getNumber(),
                        'instanceItem': data
                    }
                };
                loggerUtil.log('firing event');
                element.dispatchEvent(new CustomEvent('dplist:instanceSelect', params));

				//Reset search field
				// Updating the observable doesnt clear text for rawValue, hence use OJ to set value
				$('#pcs-dp-list-search-input', element).ojInputText({'value': ''});
            };

            //Method to refresh the instance listing
            self.refreshInstanceList = function() {
				resetQueryOffset();
                fetchInstanceList(self.selectedFilterParam()).then(function() {
					showMoreText();
				});
            };


			/**
			 * method called when user click on filtering dialog ok
			 */
			self.performFiltering = function() {
				self.selectedUpdatedBy(getSelectedIdentity());
            	self.createFilterBar();
				resetQueryOffset();
                fetchInstanceList(self.selectedFilterParam()).then(function() {
					showMoreText();
				});
				self.closeDialog();
            };

			self.closeDialog = function(){
				$('.pcs-dp-dialog').ojDialog('close');
			};

            //Handle on click of refresh button
            self.onRefreshBtnClick = function() {
                self.refreshInstanceList();
                self.populateProcessDefinitions(true);
            };

            //Fetch the InstanceList data
            function fetchInstanceList(params) {

                //Start the loading indicator
                $('#pcs-dp-list-overlay', element).addClass('pcs-common-load-overlay');

                var promise = $.Deferred();

                service.fetchInstanceList(true, params).then(function(data) {

					totRecordsFetched = data.length;
					// if(params.aggregateInstances && totRecordsFetched === 0){
					// 	self.hideErrorRegion();
					// 	promise.resolve();
					// }

					dataArr = params.aggregateInstances ? dataArr.concat(data) : data;
					//Update ListData
					self.viewDataSource(new oj.ArrayTableDataSource(dataArr, {
						idAttribute: 'getNumber'
					}));

                    if(!dataArr || dataArr.length === 0){
						$( '#pcs-dp-list-empty-container',element ).show();
					}else {
						$('#pcs-dp-list-empty-container', element).hide();
					}

					self.hideErrorRegion();

                    promise.resolve();
                }, function(rejected) {

                    self.showErrorRegion();

                });
                return promise;
            }

			self.loadMoreTasks = function() {
				var offset = dataArr.length + defaultPageSize;
				self.firstResult(self.currentOffset() + 1);
				self.currentOffset(offset);
				self.isMoreClicked(true);
				fetchInstanceList(self.selectedFilterParam()).then(function() {
					showMoreText();
					self.isMoreClicked(false);
				});
			};


			//Show the paging text
			function showMoreText() {
				if (totRecordsFetched < defaultPageSize) {
					self.hasMoreRecs(false);
				} else {
					self.hasMoreRecs(true);
				}
			}

			function resetQueryOffset(){
				totRecordsFetched = 0;
				self.firstResult(0);
				self.currentOffset(defaultPageSize);
			}

            /**
             * When the rest call fails
             */
            self.showErrorRegion = function() {
                $('#pcs-dp-list-error', element).show();
                $('#pcs-dp-list-view-wrapper', element).hide();
                // remove overlays for loading
                $('#pcs-dp-list-overlay', element).removeClass('pcs-common-load-overlay');
            };

			/**
			 * When the rest call is success
			 */
			self.hideErrorRegion = function() {
				$('#pcs-dp-list-error', element).hide();
				$('#pcs-dp-list-view-wrapper', element).show();
				// remove overlays for loading
				$('#pcs-dp-list-overlay', element).removeClass('pcs-common-load-overlay');
			};

            //method to search as soon as user type
            function searchInstanceList(searchtext) {
                var promise = $.Deferred();
                service.searchInstanceList(searchtext).then(function(data) {

					//Update ListData
					self.viewDataSource(new oj.ArrayTableDataSource(data, {
						idAttribute: 'getNumber'
					}));

                    promise.resolve();
                });
                return promise;
            }


            self.init = function() {
				self.viewDataSource(new oj.ArrayTableDataSource(dataArr, {
					idAttribute: 'getNumber'
				}));

                if (window.localStorage['dp-dplist-view'] === null) {
                    window.localStorage.setItem('dp-dplist-view', 'LIST');
                    self.displayView('LIST');
                }
                displayViewOnload();

                service = InstanceService.getInstance();

                fetchInstanceList(self.selectedFilterParam()).then(function() {
					showMoreText();
				});
            };


            self.reInitInstanceList = function (){
            	//clean the search Text
				self.searchText('');
				// var elem = $('#pcs-dp-list-search-input',element);
				// elem.ojInputSearch('option', 'value','');
				// elem.ojInputSearch('refresh');
				self.refreshInstanceList();
			};

            self.bindingsApplied = function() {
                self.init();
                //TODO : Fix event
                //pcsUtil.eventHandler.addHandler(element,'dpdetail:closeView', self.reInitInstanceList);
                pcsUtil.eventHandler.addHandler(document, 'dpdetail:closeView', self.reInitInstanceList);
            };

            //method to search as soon as user type
            self.searchTextSubscription = self.searchText.subscribe(function(newValue) {
            	var searchString = newValue;
				if (Array.isArray && Array.isArray(newValue)){
					searchString = newValue[0];
				}
				if(!searchString){
					searchString ='';
				}
				self.hasSearchTxt(searchString.length > 0);
                searchInstanceList(searchString);
            });

            self.onSearchClearClick = function(){
				//Updating the observable doesnt clear text for rawValue, hence use OJ to set value
				$('#pcs-dp-list-search-input', element).ojInputText({'value': ''});
			};

            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function() {
                loggerUtil.log('dispose in dplist');
                self.selectedFilterParam.dispose();
                self.searchTextSubscription.dispose();
                pcsUtil.eventHandler.removeHandler(document, 'dpdetail:closeView', self.reInitInstanceList);

            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
