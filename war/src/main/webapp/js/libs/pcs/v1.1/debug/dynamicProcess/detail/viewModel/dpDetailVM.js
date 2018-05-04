/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPDetailService', 'pcs/util/pcsUtil', 'ojs/ojknockout', 'promise', 'ojs/ojtabs', 'ojs/ojnavigationlist', 'pcs/pcs.taskdetail',
        'pcs/pcs.attachments', 'ojs/ojpopup', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'
    ],
    function(oj, ko, $, InstanceDetail, pcsUtil) {

        'use strict';

        return function(params,componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');
            var service;
            var element = componentInfo.element;
            self.properties = params;

            var tabid_prefix = 'pcs-dp-det-act-tab-items-task-';
            var activityDetail_divid_prefix = 'pcs-dp-det-act-tab-items-data-';

            //Attributes for top section
            self.instanceId = ko.observable();
            self.instanceTitle = ko.observable();
            self.instanceState = ko.observable();
            self.instanceStateClass = ko.observable();
            self.instanceItem = ko.observable();

            //attribute for roles page
			self.isRoleWritable = ko.observable(true);

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            // List of actvities for this  instance
            self.executionsList = ko.observableArray([]);

            self.tabTitleMap = {
                'CD_DATA': self.bundle.pcs.dp.detail.details,
                'CD_DOCS': self.bundle.pcs.dp.detail.documents,
                'CD_HISTORY': self.bundle.pcs.dp.detail.history,
                'CD_ROLE': self.bundle.pcs.dp.detail.roles
            };

            //attribute to store left navigation seelcted item
            self.selectedNavigationItem = ko.observable('CD_DATA');

            //Attribute to hold confirm message
            self.actionConfirmMessage = ko.observable('');

            //attribute to hold pending action
            self.pendingAction ={};

            //attribute to hold long error msg
            self.longErrorMessage = ko.observable();

            //attribute to hold short error msg
            self.shortErrorMessage = ko.observable();

			//attribute to hold if the component is standalone or used inside mgmt
			self.isConsumed = ko.observable(false);

			// attribute to select currently view activity detail in tab
			self.selectedTabExecutionId = ko.observable();

			// attribute to store what all actvity details are opened
			self.openedActivities = ko.observableArray([]);

            function getRefresedTime() {
                var currentdate = new Date();
                var datetime = 'Last Sync at ' +
                    currentdate.getHours() + ':' +
                    currentdate.getMinutes() + ':' +
                    currentdate.getSeconds();
                self.lastRefreshedTime(datetime);
            }

            self.selectedNavigationItemTitle = ko.computed(function() {
                return self.tabTitleMap[self.selectedNavigationItem()];
            });

            // // attribute for showing the title
            // self.fullTitle = ko.computed(function() {
            //     return self.instanceTitle() + ' (Instance Id: ' + self.instanceId() + ')';
            // }, self);


            //Attribute to store refresh time
            self.lastRefreshedTime = ko.observable();
            getRefresedTime();


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


				if (self.properties.instanceitem) {
					if(ko.isObservable (self.properties.instanceitem)){
						self.populateData(self.properties.instanceitem());
					}else{
						self.populateData(self.properties.instanceitem);
					}
                } else {
                    self.fetchInstanceDetail();
                }
            };

            //Handle error from rest api calls
            //Fire Error Event to handle errors at the top level
            function handleError(error) {
                self.shortErrorMessage(error.shortMsg);
                self.longErrorMessage(error.longMsg);
                $('#pcs-dp-det-err-dialog',element).ojDialog('open');
            }


            self.handleActivityActionError  = function(event){
				var data = event.detail;

				self.shortErrorMessage(data.shortErrorMessage);
				self.longErrorMessage(data.longErrorMessage);
				$('#pcs-dp-det-err-dialog',element).ojDialog('open');
			};

            //Method to populate  detail data
            self.populateData = function(instanceitem) {
                self.instanceTitle(instanceitem.getTitle());

                var state = instanceitem.getState();
                self.instanceState(state);
                switch (state) {
                    case 'ACTIVE':
                        self.instanceStateClass('pcs-dp-det-status-active-icon');
                        break;
                    case 'COMPLETED':
                        self.instanceStateClass('pcs-dp-det-status-complete-icon');
                        break;
                    case 'TERMINATED':
                        break;
                    case 'CLOSED':
                        break;
                }
                self.instanceItem(instanceitem);

                if (instanceitem.getPermissionsList().indexOf('ROLE_WRITE') >= 0 ){
                	self.isRoleWritable (true);
				}else{
					self.isRoleWritable (false);
				}
            };

            //Method to do AJAX call to get instance detail
            self.fetchInstanceDetail = function() {
                var promise = $.Deferred();
                service.fetchInstanceItem(true, self.instanceId()).then(function(data) {
                    self.populateData(data);
                    promise.resolve();
                }, function(rejected) {
					self.showErrorRegion();
                });
                return promise;
            };

            //Method to fetch execution
            self.fetchExecutionList = function() {
                //Start the loading indicator
                $('#pcs-dp-det-overlay', element).addClass('pcs-common-load-overlay');

                var promise = $.Deferred();
                var param = {
                    'processInstanceId': self.instanceId()
                };
                service.fetchExecutionList(true, param).then(function(data) {
                    //clean old executions
                    self.executionsList.removeAll();

                    //Create new list
                   // Way to improve observableArray performance

                    var array = self.executionsList();
                    ko.utils.arrayPushAll(array, data);
                    self.executionsList.valueHasMutated();

                    // Child components are already created , notify them of changes
                  //  self.notifyChildComponents(data);

                    //stop the loading indicator
                    $('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');

                    promise.resolve();
                }, function(rejected) {
					self.showContentErrorRegion('Error occurred while getting the list of activities');
                    //stop the loading indicator
                    $('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');
                });
                return promise;
            };


			/**
			 * When the rest call fails
			 */
			self.showErrorRegion = function() {
				$('#pcs-dp-det-error', element).show();
				$('#pcs-dp-det-content-holder', element).hide();
				$('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');
			};


			/**
			 *
			 * @param data
			 */
			self.showContentErrorRegion = function(msg) {
				self.showContentMsgRegion (msg,false);
				$('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');

			};

			self.showContentSuccessRegion = function (msg){
				self.showContentMsgRegion (msg,true);
			};

			self.showContentMsgRegion = function(msg,success) {
				var successIcon ='';
				var addClass ='';
				var removeClass = '';
				if (success){
					successIcon = 'pcs-dp-det-content-success-icon';
					addClass ='pcs-dp-det-content-success';
					removeClass = 'pcs-dp-det-content-error';
				}
				else{
					successIcon = 'pcs-dp-det-content-error-icon';
					addClass = 'pcs-dp-det-content-error';
					removeClass ='pcs-dp-det-content-success';
				}

				var html ='<span class=\''+successIcon +'\' style=\'margin:20px\'>'+ msg + '</span>';
				$('#pcs-dp-det-content-msg-container',element).show(0).html(html).addClass(addClass).removeClass(removeClass).delay(10000).hide(1000);

				//scroll to top to show error
				$('#pcs-dp-det-container',element)[0].scrollIntoView();
			};


            function getConfirmationMsg(actionType) {
                var msg = 'Please confirm if you want to proceed with {actionType} action.';
                msg = msg.replace('{actionType}', actionType);
                return msg;
            }

            //Create the event params for CloseView Event
            function getCloseViewEventParams(action) {

                //loggerUtil.log('firing event for closing');
                return {
                    'bubbles': true,
                    'detail': {
                        'instanceId': self.instanceId(),
                        'action': action
                    }
                };
            }


            /**
             * Function called when action is clicked in the UI
             * @param data
             * @param event
             */
            self.performInstanceAction = function(data,event){
                loggerUtil.log('performing action - ' +data);

                //set the pending action
                self.pendingAction = {
                    'id': data.executionId,
                    'action' : data.action
                };
                self.actionConfirmMessage(getConfirmationMsg(data.actionDisplayName, data.activityName));

                $('#pcs-dp-det-confirm-dialog',element).ojDialog('open');
            };

            //Close the confirm dialog and execute action
            self.confirmInstanceAction = function() {
                self.handleInstanceAction(self.pendingAction.id,self.pendingAction.action);
                self.closeDialog();
            };

            /**
             * Function which perform the action on the backend
             * @param executionId
             * @param action
             */
            self.handleInstanceAction = function (id,action){
				//Start the loading indicator
				$('#pcs-dp-det-overlay', element).addClass('pcs-common-load-overlay');

                var payload = {
                    action : action
                };
                service.performInstanceAction({
                    '{instanceId}': self.instanceId()
                },payload).then(function() {

					//stop the loading indicator
					$('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');

					if(self.isConsumed()) {
						element.dispatchEvent(new CustomEvent('dpdetail:closeView', getCloseViewEventParams(action)));
					}else{
						//Reload the page
						refreshExecutionList();
						element.dispatchEvent(new CustomEvent('dpdetail:actionPerformed', getCloseViewEventParams(action)));
					}
                }).fail(function(error) {
					//stop the loading indicator
					$('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');
                    handleError(error);
                });
            };


            //method to refresh the details
            function refreshExecutionList() {
                self.fetchExecutionList();
                self.fetchInstanceDetail();
                getRefresedTime();
            }

            //Handle on click of refresh button
            self.onRefreshBtnClick = function() {
                refreshExecutionList();
            };

            //method to close  the  details
            self.closeDetailPage = function() {
                element.dispatchEvent(new CustomEvent('dpdetail:closeView', getCloseViewEventParams('closeView')));
            };

            //method to hide highlight region
            self.closeHighlightRegion = function() {
                $('#pcs-dp-det-highlight-region', element).hide();
                $('#pcs-dp-det-highlight-region-hide', element).hide();
                $('#pcs-dp-det-highlight-region-show', element).show();
            };

            //method to show highlight region
            self.showHighlightRegion = function() {
                $('#pcs-dp-det-highlight-region', element).show();
                $('#pcs-dp-det-highlight-region-hide', element).show();
                $('#pcs-dp-det-highlight-region-show', element).hide();
            };

            //method to be called when navigation option changes
            self.navOptionChange = function(event, data) {
                if (data['option'] === 'selection') {

                    if (data.value === 'CD_DOCS') {
                        var attachments = $('#pcs-attachments1', element);
                        self.initAttachments(attachments);
                    }

                    if (data.value === 'CD_DATA') {

                    }

					if (data.value === 'CD_TASK') {
						$('#pcs-dp-det-act-tab',element).show();
					}else{
						$('#pcs-dp-det-act-tab',element).hide();
					}
					// select the new tab
					// var tabsElement = $('#pcs-dp-det-act-tab', element);
					// tabsElement.ojTabs('option', 'selected', 'pcs-dp-det-act-tab-items-data-tid1');
                }
            };

            // method to be called when  Activity is clicked
            self.openActivityDetails = function(event) {
                var data = event.detail;

				//Start the loading indicator
				$('#pcs-dp-det-overlay', element).addClass('pcs-common-load-overlay');

				//Show a Tab for PCS Taskß
                if (data.type === 'pcstask' || data.type === 'humanTask') {
					data.iconClass = 'pcs-dp-act-humantask-icon';
                    self.openTaskTab(data);
                } else if (data.type === 'pcsprocess' || data.type === 'processTask') {
					data.iconClass = 'pcs-dp-act-process-icon';
                    self.openProcessTab(data);
                }else{
					self.showContentErrorRegion('Error occurred while getting details for ' + data.title);
				}

            };

            self.openTaskTab = function(activityEventData){
				// Createthe taskdetails
				service.fetchAssociatedTask({
					'{executionId}': activityEventData.executionId
				}).then(function(number) {
					activityEventData.taskNumber =  number;
					self.addTab(activityEventData);
				}).fail(function(error) {
					if(error && error.status && error.status === 401){
						self.showContentErrorRegion( 'You cannot open this activity. As you have not been granted required privileges to access the associated Task.');
					}else{
						self.showContentErrorRegion('Error occurred while getting task details for ' + activityEventData.title);
					}

				});
			};

            self.openProcessTab = function(activityEventData) {
                // Create the process details
                service.fetchAssociatedProcess({
                    '{executionId}': activityEventData.executionId
                }).then(function(processId) {
                    var instanceId = processId;
                    var url = pcsUtil.getServerURL() + '/ic/process/workspace/faces/jsf/instance/pcsAuditTrailPage.jspx?instanceId=' + instanceId + '&refreshTaskFlow=true&showBrandingChrome=false&showCloudAppSwitcher=false';
                    // var win = window.open(url, '_blank');
                    // win.focus();
					activityEventData.instanceURL =  url;
					self.addTab(activityEventData);
                }).fail(function(error) {
					if(error && error.status && error.status === 401){
						self.showContentErrorRegion( 'You cannot open this activity. As you have not been granted required privileges to access the associated Process.');
					}else {
						self.showContentErrorRegion('Error occurred while launching the process instance details for ' + activityEventData.title);
					}
                });
            };

            //method to add a new tab to show task details
            self.addTab = function(activityEventData) {
                var title = activityEventData.title;
                var id = activityEventData.executionId;
                var content = 'Loading details for activity ' + title;
                var tabid = tabid_prefix + id;

				// add the tab id in opened Activites array
				if (self.openedActivities().indexOf(tabid) === -1){
					self.openedActivities.push(tabid);
				}

				//Refresh the navigation Lisy
				var navListelem = $('#pcs-dp-det-nav-list',element);
				navListelem.ojNavigationList('refresh');

				self.selectedNavigationItem('CD_TASK');

				// Get hold of tabs element , to add new tab
                var tabsElement = $('#pcs-dp-det-act-tab', element);

                var tabs = tabsElement.find('#pcs-dp-det-act-tab-items > li');
                var exists = false;
                $.each(tabs, function(index, data) {
                    if (tabid === data.id) {
                        exists = true;
                    }
                });

                // If tab doesnt exist add the tab
                if (!exists) {
                    var divId = activityDetail_divid_prefix + id;
                    var newTab = {
                        'tab': $('<li id=' + tabid + '><span class=\'oj-start demo-icon-font '+ activityEventData.iconClass + '\' title=\''+ title + ' \' role=\'img\'> </span><span style=\'margin-left: 5px;\'>' + title + '</span>'),
                        'content': $('<div id=' + divId + ' class=\'pcs-dp-det-bar-height\'>').text(content)
                    };

                    tabsElement.ojTabs('addTab', newTab);

                    // add the new tab in the removable tabs list
					// TODO : not wrking in JET 2.0
                    // var removeableId = tabsElement.ojTabs('option', 'removable');
                    // if (typeof removeableId === 'boolean') {
                     //    removeableId = [tabid];
                    // } else {
                     //    removeableId.push(tabid);
                    // }
                    // tabsElement.ojTabs('option', 'removable', removeableId);

					//Show a Tab for PCS Taskß
					if (activityEventData.type === 'pcstask' || activityEventData.type === 'humanTask') {
						self.initTaskdetail(divId, activityEventData.taskNumber);
					} else if (activityEventData.type === 'pcsprocess' || activityEventData.type === 'processTask') {
						self.initProcessDetail(divId, activityEventData.instanceURL);
					}

                }

                // select the new tab
				tabsElement.ojTabs('refresh');
                tabsElement.ojTabs('option', 'selected', tabid);

				//Stop the loading indicator
				$('#pcs-dp-det-overlay', element).removeClass('pcs-common-load-overlay');
            };

            //Method to init Task Details
            self.initTaskdetail = function(id, number) {
                var taskdetail = $('#' + id, element);

                //if the plugin was already used  clean it up
				self.cleanTaskDetailWidget(taskdetail);

                var options = {
                    taskNumber: number,
                    hideAttachment: true,
					hideClose: true,
					reloadOnSave: true,
					reloadOnSubmit: true
				};

                //Initiate the Component
                taskdetail.taskdetail(options);

                // add the event listerner
				taskdetail.on('taskdetail:submit', self.humanTaskEventListener);


            };

			/**
			 * method to be called when activites list is updated
			 * @param event
			 * @param data
			 * @param action
			 */
			self.humanTaskEventListener = function (event, data, action){
				// refresh activities list
				refreshExecutionList();
			};

            //method to init instanceDetail
			self.initProcessDetail = function(id, url){
				var instancedetail = $('#' + id, element);
				var divOverlayId = id + '-overlay' ;


				var iframe  = document.createElement('iframe');
				iframe.id   = id + '-iframe';
				iframe.target  = '_top';
				iframe.src = url;
				iframe.frameborder = '0';
				iframe.seamless = 'seamless';
				iframe.scrolling = 'auto';
				iframe.style.cssText = 'overflow-x:hidden; width:100%;';
				iframe.height = '550px';
				iframe.onload = function (){
					//Stop the loading indicator
					$('#'+divOverlayId, element).removeClass('pcs-common-load-overlay');
				};

				var overlay_div = document.createElement('div');
				overlay_div.id = divOverlayId;


				instancedetail.empty();
				// add the overlay
				instancedetail.append(overlay_div);

				//add the loading indicator
				$('#'+divOverlayId, element).addClass('pcs-common-load-overlay');

				// add the iframe
				instancedetail.append(iframe);
			};

            //Method to init attachment
            self.initAttachments = function(attachments) {
                //if the plugin was already used  clean it up
                if (attachments && attachments.data() && !$.isEmptyObject(attachments.data())) {
                    attachments.attachments('destroy');
                }

                ko.cleanNode(attachments['0']);

                var options = {
                    hideDelete: false,
                    hideTitle: false,
                    hideUploadLink: false,
                    readOnly: false,
                    mode: 'dp',
                    isDocsEnabled: true,
                    id: self.instanceId(),
					showDocsInline: true
                };

                //Initiate the Component
                self.plugin = attachments.attachments(options);
            };

			/**
			 * method called when activity tab is removed from UI
			 * @param event
			 * @param ui
			 */
            self.activityTabRemoveListener = function(event,ui){

            	var tab = ui.tab ;
            	var tabid = tab[0].id;
				self.openedActivities.remove(tabid);

				//clean task details widget
				var executionId = tabid.substring (tabid_prefix.length,tabid.length);

				var divID = activityDetail_divid_prefix + executionId;

				var divContainor = $('#' + divID, element);

				//if the plugin was already used  clean it up
				self.cleanTaskDetailWidget(divContainor);


				if(self.selectedTabExecutionId() === executionId){
					self.selectedTabExecutionId('');
				}


				if(self.openedActivities().length === 0){
					self.selectedNavigationItem('CD_DATA');
				}
			};

			/**
			 * method called when activity tab is removed from UI
			 * @param event
			 * @param ui
			 */
			self.activityTabSelectionListener= function(event,ui){
				var tab = ui.toTab ;
				var tabid = tab[0].id;   // tabid_prefix + id;

				var executionId = tabid.substring (tabid_prefix.length,tabid.length);

				self.selectedTabExecutionId(executionId);
			};


           self.handleActivityActionPerformed = function (event){
				var data = event.detail;
				var msg  = 'Successfully performed action ' + data.actionDisplayName + ' on ' + data.activityName;
			   self.showContentSuccessRegion (msg);

			   // refresh the task details if its openened
			   var tabId = tabid_prefix + data.executionId;

			   // refres the tab if its opened in Activity details
			   if (self.openedActivities().indexOf(tabId) !== -1){
				  // TODO: handle the refresh of activity which is opened
				   var divID = activityDetail_divid_prefix + data.executionId;
				   var divContainor = $('#' + divID, element);
				   //if the plugin was already used  clean it up
				   self.cleanTaskDetailWidget(divContainor);

				   divContainor.empty().html('<span class=\'oj-flex pcs-dp-det-tab-action-performed-text\' style=\'margin:20px\'>' +  msg +'</span>');
			   }

			   refreshExecutionList();
		   };


           self.cleanTaskDetailWidget = function(taskdetail){
				//if the plugin was already used  clean it up
			   try{
			   		//clean all event listers
				   taskdetail.off();
				   if (taskdetail && taskdetail.data() && !$.isEmptyObject(taskdetail.data())) {
					   taskdetail.taskdetail('destroy');
					   ko.cleanNode(taskdetail['0']);
				   }
			   }catch(e){
			   		loggerUtil.log(e);
			   }

			};


            self.bindingsApplied = function() {
				self.selectedNavigationItem('CD_DATA');

                //temp for Knockoutcomponet
                self.initContext();

                // create the activity list
                self.fetchExecutionList();

                //Subscribe to the events
                pcsUtil.eventHandler.addHandler(element,'dpactivity:drilldown', self.openActivityDetails);
                pcsUtil.eventHandler.addHandler(element,'dphistory:drilldown', self.openActivityDetails);
                pcsUtil.eventHandler.addHandler(element,'dpactivity:actionPerformed', self.handleActivityActionPerformed);
				pcsUtil.eventHandler.addHandler(element,'dpactivity:actionError', self.handleActivityActionError);
                pcsUtil.eventHandler.addHandler(element,'dpactivity:close', self.onActionClick);
            };


            self.showInfoPopup = function(data, event) {
                var popup = $('#pcs-dp-det-info-popup', element);
                if (popup.ojPopup('isOpen')) {
                    popup.ojPopup('close');
                } else {
                    var position = {
                        'my': 'center top',
                        'at': 'center bottom',
                        'collision': 'none'
                    };
                    popup.ojPopup('open', '#pcs-dp-det-info-btn', position);
                }
            };

            var isClosed = true;
            self.onActionClick = function() {
                var middleWidth;
                var endWidth;
                var actionBtn = $('#pcs-dp-det-actions-btn', element);
                var activityDiv = $('#pcs-dp-det-activity-div', element);
                if (isClosed) {
                    middleWidth = '92%';
                    endWidth = '0';
                    isClosed = false;
                    actionBtn.show();
                } else {
                    middleWidth = '67%';
                    endWidth = '25%';
                    isClosed = true;
                    actionBtn.hide();
                }
                var middlebar = $('#pcs-dp-det-bar-middle', element);
                $('#pcs-dp-det-bar-end', element).animate({
                    width: endWidth
                }, {
                    duration: 500,
                    start: function() {
                        activityDiv.hide();
                    },
                    complete: function() {
                        middlebar.css('width', middleWidth);
                        activityDiv.show();
                    }
                });
            };

			self.closeDialog = function() {
				$('.pcs-dp-dialog').ojDialog('close');
			};


            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function(){
                loggerUtil.log('dispose in instance detail');
                self.selectedNavigationItemTitle.dispose();
               // self.fullTitle.dispose();

                //De-Subscribe to the events
                pcsUtil.eventHandler.removeHandler(element,'dpactivity:drilldown', self.openActivityDetails);
                pcsUtil.eventHandler.removeHandler(element,'dphistory:drilldown', self.openActivityDetails);
                pcsUtil.eventHandler.removeHandler(element,'dpactivity:actionPerformed', self.handleActivityActionPerformed);
				pcsUtil.eventHandler.removeHandler(element,'dpactivity:actionError', self.handleActivityActionError);
                pcsUtil.eventHandler.removeHandler(element,'dpactivity:close', self.onActionClick);
            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
