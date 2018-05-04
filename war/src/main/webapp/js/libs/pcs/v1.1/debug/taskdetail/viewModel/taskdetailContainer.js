/**
 * Created by nisabhar on 5/6/2016.
 */

define(['ojs/ojcore', 'knockout', 'pcs/taskdetail/services/taskdetailDataService', 'pcs/util/pcsUtil','pcs/pcsform/pcsFormUtil', 'pcs/util/dateUtil' ,
		'!text!pcs/taskdetail/templates/pcs-task-history.html', 'pcs/taskdetail/viewModel/taskHistoryContainer','ojs/ojknockout',
        'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojcollapsible', 'pcs/pcs.attachments', 'pcs/pcs.comments',
		'ojs/ojselectcombobox', 'ojL10n!pcs/resources/nls/pcsSnippetsResource', 'pcs/pcs.conversation' ],
    function(oj, ko, services, pcsUtil,pcsFormUtil,dateUtil,historyView,historyVM) {
        'use strict';
        /**
         * The view model for the main content view template
         */
        function TaskdetailContainer(params) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            //all the data passed to the container
            self.data = params.data;

            //the jquery element where the widget is pushed, all the selectors will work in context of this element
            self.rootElement = self.data.rootElement;

            //the main Data object of the plugin
            self.taskNumber = self.data.taskNumber;

            // form type
            self.formType = ko.observable('');

            //Complete Frevvo form url including server path
            self.formURL = ko.observable();

            //label for attachment/docs
			self.attachmentsLabel =  ko.observable(self.bundle.pcs.taskdetail.attachments);

            //Task object
            self.selectedTaskObject = '';
            self.taskObject = {
                customActions: ko.observableArray([]),
                systemActions: ko.observableArray([]),
                assignedDate: ko.observable(),
                createdDate: ko.observable(),
                updatedDate: ko.observable(),
                dueDate: ko.observable(),
                creator: ko.observable(),
                fromUser: ko.observable(),
                number: ko.observable(),
                owner: ko.observable(),
                priority: ko.observableArray([]),
                processName: ko.observable(),
                title: ko.observable(),
                shortSummary: ko.observable(),
                outcome: ko.observable()
            };

            self.priorityOptions = ko.observableArray([
				{
					value: 'LOW',
					label: self.bundle.pcs.taskdetail.priority_low
				},
            	{
					value: 'NORMAL',
					label: self.bundle.pcs.taskdetail.priority_normal
            	},
				{
					value: 'HIGH',
					label: self.bundle.pcs.taskdetail.priority_high
				}
            ]);

            self.priorityMap = {
                1: 'HIGH',
                2: 'HIGH',
                3: 'NORMAL',
                4: 'LOW',
                5: 'LOW'
            };

            self.priorityStringMap = {
                HIGH: 1,
                NORMAL: 3,
                LOW: 5
            };

            self.showResize = ko.observable(!self.data.hideResize || false);

            self.viewExpanded = ko.observableArray((self.data.viewExpanded ? ['true'] : []));

            //Hack for waiting for frevvo form to Post submit message .
            // Also if the frevvo ear doent have the fix for post message
            // Its required as frevvo fires multiple Post Message
            self.waitForMessage = false;

            // If the task is completed
            self.readOnly = ko.observable(false);

			self.viewExpandedSubscription= self.viewExpanded.subscribe(function(newValue) {
                var isExpanded = newValue[0] === 'true';
                $('#pcs-td-expand', self.rootElement).trigger('taskdetail:expandDetailView', isExpanded);
			});

            self.componentRenderCount = 0;

            var handleComponentRenderStart = function() {
                self.componentRenderCount++;
            };

            var handleComponentRenderFinish = function() {
                loggerUtil.log(self.componentRenderCount);
                self.componentRenderCount--;
                if (self.componentRenderCount === 0) {
                    setTimeout(function() {
                        self.rootElement.trigger('taskdetail:loaded');
                    }, 500);
                }
            };

            //This method is to get the task Object
            self.initTaskdetail = function() {
                //Start the loading indicator
                $('#pcs-td-overlay').addClass('pcs-common-load-overlay');

                //trigger service to fetch data for task number
                services.getTaskObject(self.taskNumber).done(
                    function(data, textStatus, jqXHR) {
                        // Hide the loading indicator
                        $('#pcs-td-overlay').removeClass('pcs-common-load-overlay');
                        $('#pcs-td-error', self.rootElement).hide();
                        $('#pcs-td-detailContainer', self.rootElement).show();

                        //populate task object
                        self._populateTaskObject(data);

                        // set form type
                        if (data['formMetadata'] && data['formMetadata'].indexOf('/webforms/')) {
                            self.formType('webform');
                        }
                        else if(data['externalUIURL']){
							self.formType('external');
						}
                        else {
                        	//no frevvo in EC
                            self.formType('none');
                        }

                        //Load form
                        self.initForm(data);

                        //don't do anything for external form
						if(self.formType() != 'external'){
							//load attachments
							self.initAttachment(self.data);

							//load comments
							self.initComments();

							//load conversation
							self.initConversation();
						}

                        //set the renderFlag back to false
                        self.renderFlag = false;
                    }
                ).fail(
                    function(jqXHR) {
                        // Hide the loading indicator
                        $('#pcs-td-overlay').removeClass('pcs-common-load-overlay');

                        //Hide Task Detail UI
                        $('#pcs-td-detailContainer', self.rootElement).hide();

                        var msg = ''; //self.bundle.pcs.common.access_error_msg;
                        self.tdContainerErrorHandler(jqXHR, msg);
                    }
                );
            };

			//Function to clean up the element and un apply its bindings
            self.cleanUpFormContainer = function(){
				if (self.formType() === 'webform') {
					var rootNode = $('#pcs-td-form-container', self.rootElement);
					if (rootNode && rootNode.length > 0) {
						ko.cleanNode(rootNode['0']);
						//Un apply the bindings for the node and its children
						pcsUtil.unApplyBindings(rootNode, false);
					}
				}
			};

            self.tdContainerErrorHandler = function(jqXHR, customMsg) {
                var msg = self.ajaxErrorHandler(jqXHR, customMsg);
                $('#pcs-td-error-msg', self.rootElement).text(msg);
                $('#pcs-td-error', self.rootElement).show();
            };

            self.actionErrorHandler = function(jqXHR, customMsg) {
                var msg = self.ajaxErrorHandler(jqXHR, customMsg);
                $('#pcs-td-action-error-msg', self.rootElement).text(msg);
                $('#pcs-td-action-error-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);
            };

            self.formErrorHandler = function(jqXHR, customMsg) {
                var msg =customMsg; // self.ajaxErrorHandler(jqXHR, customMsg);

                $('#pcs-td-form-error-msg', self.rootElement).text(msg);
                $('#pcs-td-form-error-container', self.rootElement).show().delay(5000).fadeOut(2000);
            };

            // Error handler method for the plugin
            self.ajaxErrorHandler = function(jqXHR, customMsg) {
                var msg = customMsg;
                if (jqXHR && jqXHR.status === 0) {
                    msg = self.bundle.pcs.common.server_not_reachable;
                }
                if (jqXHR && jqXHR.status === 500) {
                    msg = self.bundle.pcs.common.internal_server_err;
                } else if (jqXHR && jqXHR.status === 401) {
                    // reset valid authInfo as the current auth is invalid
                    msg = self.bundle.pcs.common.access_error_msg;
                } else if (jqXHR && jqXHR.status === 404) {
                    // reset valid authInfo as the current auth is invalid
                    msg = self.bundle.pcs.common.not_found_error;
                }
                return msg;
            };

            function showValidationError(error) {
                var errorMsg = self.bundle.pcs.taskdetail.form_validation_error;
				if(error && error.id === 'CANCELED'){
					errorMsg = error.message;
				}
                self.formErrorHandler(null, errorMsg);
                //Hide overlay
                $('#pcs-td-overlay').removeClass('pcs-common-load-overlay');
            }


            // Method to Load appropriate form
            self.initForm = function(data) {
                if (self.formType() === 'webform') {
                    self.initWebform(data);
                } else if (self.formType() === 'frevvo'){
                    self.initFrevvoForm();
                }else if(self.formType() === 'external'){
					self.initExternalForm(data.externalUIURL);
				}else{
					$('#pcs-td-form-container', self.rootElement).empty();
					$('#pcs-td-form-empty-text', self.rootElement).show();
				}
            };


			/**
			 * function called for loading external Form
			 * @param url
			 */
			self.initExternalForm = function(url){
				//show loading indicator
				$('#pcs-td-external-form-loading', self.rootElement).show();

				//clean old events
				$('#pcs-td-external-form-iframe', self.rootElement).off();

				//clean old url
				self.formURL('');

				//hide the buttons by default
				$('.pcs-td-close-selector', self.rootElement).hide();
				$('.pcs-td-expand-selector', self.rootElement).hide();

				// url = "http://localhost:8000/test/externalForm/externalForm.html?taskNumber="+ self.taskObject.number();

				self.formURL(url);

				//attach onload event
				$('#pcs-td-external-form-iframe', self.rootElement).on('load', function() {
					//stop loading indicator
					$('#pcs-td-external-form-loading', self.rootElement).hide();
				});
			}

            // Method to Load Oracle webform
            self.initWebform = function(data) {
                //Start the loading indicator of form
                $('#pcs-td-form-loading', self.rootElement).show();

                if (data['payload'] && data['payload']['payload'] && data['payload']['payload']['href']) {
                    var payloadUrl = data['payload']['payload']['href'];
                    var formMetadataUrl = data['formMetadata'];

                    if (formMetadataUrl && payloadUrl) {
                        handleComponentRenderStart();

                        services.getTaskPayloadByURL(payloadUrl)
                            .done(function(payload) {
                                var webFormContainer = $('#pcs-td-form-container', self.rootElement);
                                var formRendererId = 'task-' + self.taskNumber;
                                var properties = {
                                    formMetadataUrl: formMetadataUrl,
                                    payload: payload,
                                    webFormContainer: webFormContainer,
                                    formRendererId: formRendererId,
									readOnly : self.readOnly(),
									outcomeCallback : self._saveOrSubmitTaskWithWebform
                                };
                                pcsFormUtil.loadPCSForm(properties)
                                    .then(function() {
                                        $('#pcs-td-form-loading', self.rootElement).hide();
                                        handleComponentRenderFinish();
                                    }, function(jqXHR) {
                                        $('#pcs-td-form-loading', self.rootElement).hide();
                                        var msg = self.bundle.pcs.taskdetail.form_retrieve_error;
                                        self.formErrorHandler(jqXHR, msg);
                                        handleComponentRenderFinish();
                                    });
                            }).fail(function(jqXHR) {
                                $('#pcs-td-form-loading', self.rootElement).hide();
                                var msg = self.bundle.pcs.taskdetail.taskform_error;
                                self.formErrorHandler(jqXHR, msg);
                                handleComponentRenderFinish();
                            });
                    }
                } else {
                    $('#pcs-td-form-loading', self.rootElement).hide();
                    var msg = self.bundle.pcs.taskdetail.form_retrieve_error;
                    self.formErrorHandler(null, msg);
                }
            };

            // Method to Load frevvo form
            self.initFrevvoForm = function() {
                //Start the loading indicator of form
                $('#pcs-td-form-loading', self.rootElement).show();

                handleComponentRenderStart();
                services.getFrevvoFormUrl(self.taskNumber).done(
                    function(data, textStatus, jqXHR) {
                        // Set the form URL
                        if (data && data !== '') {
                            self.formURL(data);
                        } else {
                            var customMsg = self.bundle.pcs.taskdetail.no_form;
                            self.formErrorHandler(jqXHR, customMsg);
                        }
                        handleComponentRenderFinish();
                    }
                ).fail(
                    function(jqXHR) {
                        // Hide the loading indicator
                        $('#pcs-td-form-loading', self.rootElement).hide();

                        //there is no form associated with this task
                        var msg = '';
                        if (jqXHR && jqXHR.status === 404) {
                            msg = self.bundle.pcs.taskdetail.no_form;
                        } else {
                            msg = self.bundle.pcs.taskdetail.form_load_error;
                        }
						self.formType('none');
						$('#pcs-td-form-container', self.rootElement).hide();
                        self.formErrorHandler(jqXHR, msg);
                        handleComponentRenderFinish();
                    }
                );
            };

            // Method to Load attachment snippet
            self.initAttachment = function() {
                if (!self.data.hideAttachment) {
					var attachmentsOptions = typeof self.data.attachmentsOptions === 'string' ? JSON.parse(self.data.attachmentsOptions) : self.data.attachmentsOptions;
					self._attachAttachmentPlugin(attachmentsOptions);
                }
            };

            // This use case is handled by attachment UI itself
            // Internal method to get DOCS folder
            //self._getTaskFolderName = function(href) {
            //    services.getTaskFolderName(href).done(
            //        function (data, textStatus, jqXHR) {
            //           var data= JSON.parse(data);
            //          self._attachAttachmentPlugin(data.dcsfolder);
            //        }
            //    ).fail(
            //        function (jqXHR) {
            //            // Hide the loading indicator
            //            $('#pcs-td-loading', self.rootElement).hide();
            //            var customMsg = 'Error occurred while getting attachment';
            //            $('#pcs-td-action-error-msg',self.rootElement).text(customMsg);
            //            $('#pcs-td-action-error-msg-container',self.rootElement).show().delay(5000).fadeOut(2000);
            //        }
            //    );
            //
            //};

            // Method to attach attachment plugin to the UI
            self._attachAttachmentPlugin = function(options) {
                //  loggerUtil.log(dcsfolderName);
                var attachmentDiv = $('#pcs-td-attachment-container', self.rootElement);

                //if the plugin was already used  clean it up
                if (attachmentDiv && attachmentDiv.data() && !$.isEmptyObject(attachmentDiv.data())) {
                    attachmentDiv.attachments('destroy');
                }

                ko.cleanNode(attachmentDiv['0']);
                handleComponentRenderStart();
                self.attachmentPlugin = attachmentDiv.attachments({
                    hideTitle: true,
                    mode: 'task',
                    id: self.taskNumber,
                    readOnly: self.readOnly(),
                    isDocsEnabled: self.selectedTaskObject.isDocsEnabledFlag,
					showDocsInline: options.showDocsInline
                });

                // Defining the event listeners --
                attachmentDiv.on('attachments:attachmentUploaded', function(event, attachment) {
                    // loggerUtil.log('attachment added');
                    self.rootElement.trigger('taskdetail:attachmentUploaded', [attachment]);
                });

                // Defining the event listeners --
                attachmentDiv.on('attachments:attachmentRemoved', function(event, attachment) {
                    // loggerUtil.log('attachment remvoed');
                    self.rootElement.trigger('taskdetail:attachmentRemoved', [attachment]);
                });

                attachmentDiv.on('attachments:loaded', function(event) {
                    //loggerUtil.log('Attachments');
                    handleComponentRenderFinish();
                });
            };

            // Method to Load Conversation snippet
            self.initConversation = function() {
                if (!self.data.hideConversation && self.selectedTaskObject.isConversationEnabledFlag) {
                    $('#pcs-td-conversation', self.rootElement).show();
                    $('#pcs-td-link-conversation', self.rootElement).show();
                    self._attachConversationPlugin();
                }
            };

            // Method to attach Conversation plugin to the UI
            self._attachConversationPlugin = function() {
                var conversationDiv = $('#pcs-td-conversation-container', self.rootElement);

                //if the plugin was already used  clean it up
                if (conversationDiv && conversationDiv.data() && !$.isEmptyObject(conversationDiv.data())) {
                    conversationDiv.conversation('destroy');
                }

                ko.cleanNode(conversationDiv['0']);
                handleComponentRenderStart();
                self.conversationPlugin = conversationDiv.conversation({
                    id: self.taskNumber,
                    mode: 'task'
                });

                // Defining the event listeners --
                conversationDiv.on('conversations:loaded', function(event) {
                    //loggerUtil.log('Conversations');
                    handleComponentRenderFinish();
                });
            };

            // Method to Load Comments snippet
            self.initComments = function() {
                if (!self.data.hideComments) {
                    self._attachCommentPlugin();
                }
            };

            // Method to attach Comments plugin to the UI
            self._attachCommentPlugin = function() {
                var commentsDiv = $('#pcs-td-comments-container', self.rootElement);

                //if the plugin was already used  clean it up
                if (commentsDiv && commentsDiv.data() && !$.isEmptyObject(commentsDiv.data())) {
                    commentsDiv.comments('destroy');
                }

                ko.cleanNode(commentsDiv['0']);
                handleComponentRenderStart();
                self.commentsPlugin = commentsDiv.comments({
                    id: self.taskNumber,
                    readOnly: self.readOnly(),
                    hideTitle: true
                });

                // Defining the event listeners --
                commentsDiv.on('comments:commentAdded', function(event, comment) {
                    // loggerUtil.log('event received');
                    self.rootElement.trigger('taskdetail:commentAdded', [comment]);
                });
                commentsDiv.on('comments:loaded', function(event) {
                    //loggerUtil.log('Comments');
                    handleComponentRenderFinish();
                });
            };

            // method called when user clicks discard
            self.closeTaskDetail = function(data, event) {
                if(self.readOnly()){
					self.yesDiscardDialog();
				}
				else{
					$('#pcs-td-close-dialog', self.rootElement).ojDialog('open');
				}
            };


			/**
			 * method to read the comment componet to get any unsaved text
			 * @returns {*}
			 */
			self.getUnsavedComment = function(){
            	var comment ;
				if (self.data.postUnsavedComment && self.data.postUnsavedComment === true ) {
					var commentStr = self.commentsPlugin.comments('getUnsavedComment');
					if(commentStr && commentStr.trim() != ''){
						comment=  {
							commentStr: commentStr, commentScope: "BPM"
						}
					}
				}
				return comment;
			};

			/**
			 * method to store the payload info
			 * @param id
			 * @param actionType
			 */
			self.storePayloadInfo = function (id, actionType){

				self.payload = {
					action: {
						id: id,
						type: actionType
					}
				};

				var comment = self.getUnsavedComment();
				if(comment){
					self.payload["comment"] = comment;
				}
			};

            // method called when user clicks save
            self.saveTaskDetail = function(data, event) {
				//Start the loading indicator
				$('#pcs-td-overlay', self.rootElement).addClass('pcs-common-load-overlay');
				
                self.payload = {
                    action: {
                        id: 'SAVE'
                    }
                };
                if (self.formType() === 'frevvo') {
                    self._saveOrSubmitTaskWithFrevvo('save');
                } else  if (self.formType() === 'webform') {
                    self._saveTaskWithWebform('save');
                }
                else{
					self._performTaskAction('save');
				}
            };

            // method called when user clicks submit
            self.submitTaskDetail = function(data, event) {
                var id = data.actionId;

                if (!id) {
                    id = data.title;
                }

                // store the payload info
				self.storePayloadInfo(id, data.actionType);

				//Start the loading indicator
				$('#pcs-td-overlay', self.rootElement).addClass('pcs-common-load-overlay');

                if (self.formType() === 'frevvo') {
                    //if the frevvo form is present then do the validation first
                    var formUrl = self.formURL();
                    if (formUrl && formUrl !== '') {
                        var iframe = $('#pcs-td-form-iframe', self.rootElement)[0].contentWindow;

                        //submit the form for validation
                        iframe.postMessage('formValidation', pcsUtil.getServerURL());
                        self.waitForMessage = true;



                        //Call it when Post message fails to come back even after 5 seconds
                        setTimeout(function() {
                            if (self.waitForMessage) {
                                self.waitForMessage = false;
                                self._saveOrSubmitTaskWithFrevvo('submit');
                            }
                        }, 5000); // 10 seconds
                    } else {
                        self._saveOrSubmitTaskWithFrevvo('submit');
                    }
                }
                else  if (self.formType() === 'webform'){
                    self._submitTaskWithWebform('submit');
                }
                else{
					self._performTaskAction('submit');
				}
            };

            //method which saves the form first and then call method to perform action on the task
            self._saveOrSubmitTaskWithFrevvo = function(type) {

                //Start the loading indicator
                $('#pcs-td-overlay', self.rootElement).addClass('pcs-common-load-overlay');

                var formUrl = self.formURL();
                if (formUrl && formUrl !== '') {
                    //Save the frevvo form
                    services.saveFrevvoForm(self.taskNumber, self.formURL()).done(
                        function(data, textStatus, jqXHR) {
                            self._performTaskAction(type);
                        }
                    ).fail(
                        function(jqXHR) {
                            var customMsg = self.bundle.pcs.taskdetail.form_save_error;
                            self.actionErrorHandler(jqXHR, customMsg);

                            // remove overlays for loading
                            $('#pcs-td-overlay', self.rootElement).removeClass('pcs-common-load-overlay');
                        }
                    );
                } else {
                    self._performTaskAction(type);
                }
            };

            self._saveTaskWithWebform = function(type) {
                self._saveOrSubmitTaskWithWebform(type, '');
            };

            self._saveOrSubmitTaskWithWebform = function(type, outcome , caller) {
                var formRender = $('form-renderer[id*=\'task-' + self.taskNumber + '\']', self.rootElement);

				if(!formRender || formRender.length ===0 ){
					return ;
				}

				if (caller && caller === 'FORMS'){
					// store the payload info
					self.storePayloadInfo(outcome, 'Custom');
				}

				//Start the loading indicator
				$('#pcs-td-overlay', self.rootElement).addClass('pcs-common-load-overlay');

                pcsFormUtil.saveOrSubmitPCSForm(formRender, type, outcome)
                    .then(function(payloadToUpdate) {
                        try {
                            services.postTaskPayload(self.taskNumber, payloadToUpdate).done(
                                function(data, textStatus, jqXHR) {
                                    self._performTaskAction(type);
                                }
                            ).fail(function(jqXHR) {
                                self.actionErrorHandler(jqXHR, self.bundle.pcs.taskdetail.payload_update_error);
                                // remove overlays for loading
                                $('#pcs-td-overlay').removeClass('pcs-common-load-overlay');
                            });
                        } catch (err) {
                            if (type === 'save') {
                                self.actionErrorHandler(null, self.bundle.pcs.taskdetail.form_save_error);
                            } else {
                                self.actionErrorHandler(null, self.bundle.pcs.taskdetail.form_submit_error);
                            }

                            // remove overlays for loading
                            $('#pcs-td-overlay').removeClass('pcs-common-load-overlay');
                        }
                    }, function(error) {
                        showValidationError(error);
                    });
            };

            self._submitTaskWithWebform = function(type) {
				var outcome = self.payload.action.id;
                self._saveOrSubmitTaskWithWebform(type, outcome);
            };


            self._performTaskAction = function(type) {
                var payload = self.payload;

                // Check if priority changed , if yes store it in the payload
                var currentPriority = self.priorityStringMap[self.taskObject.priority()];
                var initialPriority = self.selectedTaskObject.priority;

                if (currentPriority !== initialPriority) {
                    payload.priority = currentPriority;
                }

                // perform task action
                services.performTaskAction(self.taskNumber, JSON.stringify(payload)).done(
                    function(data) {
                        // remove overlays for loading
                        $('#pcs-td-overlay', self.rootElement).removeClass('pcs-common-load-overlay');
                        var msg;
                        //Trigger the event
                        if (type === 'submit') {
                            self.rootElement.trigger('taskdetail:submit', [data, payload.action.id]);
                            msg = self.bundle.pcs.taskdetail.action_performed;
                            var actionLabel = self.bundle.pcs.taskActions[payload.action.id]?self.bundle.pcs.taskActions[payload.action.id]:payload.action.id.toLowerCase();
                            msg = oj.Translations.applyParameters(msg, {
                                '0': actionLabel
                            });
                        } else {
                            self.rootElement.trigger('taskdetail:save', [data]);
                            msg = self.bundle.pcs.taskdetail.task_saved;
                        }

						//Cleans up the form container in save flow
						self.cleanUpFormContainer();

						//Load the taskdetail again
						if((type === 'save' && self.data.reloadOnSave) || (type === 'submit' && self.data.reloadOnSubmit)){

							self.initTaskdetail();

							$('#pcs-td-action-success-msg', self.rootElement).text(msg);
							$('#pcs-td-action-success-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);
						}else{
							$('#pcs-td-mainContainer', self.rootElement).hide();
							$('#pcs-td-mainContainer-submitted', self.rootElement).show();
							$('#pcs-td-success-msg-submitted', self.rootElement).text(msg);
						}

                    }
                ).fail(
                    function(jqXHR) {
                        var customMsg = self.bundle.pcs.taskdetail.action_error;
                        self.actionErrorHandler(jqXHR, customMsg);

                        // remove overlays for loading
                        $('#pcs-td-overlay', self.rootElement).removeClass('pcs-common-load-overlay');
                    }
                );

            };


            // Method called when yest button clicked on the discard dialog
            self.yesDiscardDialog = function() {
                $('.pcs-td-close-dialog').ojDialog('close');
				self.cleanUpFormContainer();
				self.notifyExternalForm();
				self.rootElement.trigger('taskdetail:close', [ko.toJS(self.taskObject)]);
            };

            // Method called when yest button clicked on the discard dialog
            self.noDiscardDialog = function() {
                $('.pcs-td-close-dialog').ojDialog('close');
            };

            // Method called when closed button clicked on the Error dialog
            self.closeErrorDialog = function() {
                $('.pcs-td-error-dialog').ojDialog('close');
            };


			/**
			 * function to recive window postMessage for external form
			 * @param event
			 */
			self.receiveExternalFormPostMessage = function(event) {

				var key = event.message ? 'message' : 'data';
				var eventData = event[key];

				//check if the data is from external form
				//Format : {source:externalForm, event:loaded, data: {formHeight : 600} }
				//https://confluence.oraclecorp.com/confluence/display/BPM/PCS+External+UI+-+Phase+1

				if (typeof eventData === 'string' || eventData instanceof String){
					return;
				}

				if (eventData && eventData['source'] === 'externalForm') {
					//message by externaForm
					//var eventData = JSON.parse(data);

					//check for loaeded evet
					if(eventData['event'] === 'loaded'){

						//check if there is data
						if(eventData['data']){
							//see if form Height is set
							if(eventData['data']['formHeight']){
								var formHeight = eventData['data']['formHeight'];
								var height;
								try {
									height = parseInt(formHeight) + 20;
								} catch (err) {
									height = 600;
								}

								$('#pcs-td-external-form-iframe', self.rootElement).css('height', height);
							}

							if(eventData['data']['showCloseIcon']){
								$('.pcs-td-close-selector', self.rootElement).show();
							}

							if(eventData['data']['showResizeIcon']){
								$('.pcs-td-expand-selector', self.rootElement).show();
							}

						}

					}

					//event for reloading the externalForm
					if(eventData['event'] === 'reload'){
						self.initExternalForm(self.formURL());
					}

					//event for closing the taskDetail without refreshing tasklist
					if(eventData['event'] === 'close'){
						self.rootElement.trigger('taskdetail:close', [ko.toJS(self.taskObject)]);
					}

					//event for action performed in External form, Fire submit event to reload tasklist
					if(eventData['event'] === 'done') {
						var actionId = eventData['data']['actionId'];
						var msg = self.bundle.pcs.taskdetail.action_performed;
						var actionLabel = self.bundle.pcs.taskActions[actionId]?self.bundle.pcs.taskActions[actionId]:actionId.id.toLowerCase();
						msg = oj.Translations.applyParameters(msg, {
							'0': actionLabel
						});

						$('#pcs-td-external-detailContainer', self.rootElement).hide();
						$('#pcs-td-mainContainer-submitted', self.rootElement).show();
						$('#pcs-td-success-msg-submitted', self.rootElement).text(msg);


						self.rootElement.trigger('taskdetail:submit', [ko.toJS(self.taskObject),actionId ]);
					}
				}

			};

            /*
            	FREVVO : - not used in External compute
             Method to receive postMessage , for submitting form or setting page height
             */
            /*
            self.receivePostMessage = function(event) {
                if (event.origin !== pcsUtil.getServerURL()) {
                    return;
                }

                var key = event.message ? 'message' : 'data';
                var data = event[key];

                //If its a form submit success,  submit the form
                if (data === 'formValidation:success') {
                    //loggerUtil.log('trying to save')
                    if (self.waitForMessage) {
                        self.waitForMessage = false;
                        self._saveOrSubmitTaskWithFrevvo('submit');
                    }
                }

                //If its a form submit error,  Show error message
                if (data.startsWith('formValidation:error')) {
                    if (self.waitForMessage) {
                        self.waitForMessage = false;
                        var errorMsg = self.bundle.pcs.taskdetail.form_validation_error;
                        var msg = data.substring('formValidation:error'.length + 1);
                        errorMsg = errorMsg + '\r\n\r\n' + msg;

                        //Show local Message
                        self.actionErrorHandler(null, errorMsg);
                        //Hide overlay
                        $('#pcs-td-overlay', self.rootElement).removeClass('pcs-common-load-overlay');
                    }
                }

                // if its the form height , change iframe height
                if (data.startsWith('formHeight')) {
                    var formHeight = data.substring('formHeight'.length + 1);
                    var height;
                    try {
                        height = parseInt(formHeight) + 20;
                    } catch (err) {
                        height = 400;
                    }

                    // Check if the user specified form Height is more than actual form height
                    if (self.data.formHeight && self.data.formHeight !== '') {
                        try {
                            var userHeight = parseInt(self.data.formHeight, 10);
                            if (userHeight > height) {
                                height = userHeight;
                            }
                        } catch (err) {
                            height = height;
                        }
                    }

                    $('#pcs-td-form-iframe', self.rootElement).css('height', height);
                }

            };

			// FREVVO : - not used in External compute
            //Method to attach to Iframe load event to hide the loading indicator
            self.attachEvents = (function() {
                $('#pcs-td-form-iframe', self.rootElement).on('load', function() {
                    $('#pcs-td-form-loading', self.rootElement).hide();

                    if (self.data.formHeight && self.data.formHeight !== '') {
                        $('#pcs-td-form-iframe', self.rootElement).css('height', self.data.formHeight);
                    }
                });
            }());
			*/

            /**
             * method to clean all eevnts associsated
             */
            self.cleanEvents = function() {
                // Remove the PostMessage handler
                //pcsUtil.eventHandler.removeHandler(window, 'message', self.receivePostMessage); FREVVO : - not used in External compute
				pcsUtil.eventHandler.removeHandler(window, 'message', self.receiveExternalFormPostMessage);
				$('#pcs-td-attachment-container', self.rootElement).off();
				$('#pcs-td-conversation-container', self.rootElement).off();
				$('#pcs-td-comments-container', self.rootElement).off();
				$('#pcs-td-form-iframe', self.rootElement).off();
				$('#pcs-td-external-form-iframe', self.rootElement).off();
				$(self.rootElement).off();
            };

            /**
             * method to add events
             */
            self.addEvents = (function() {
                // Add the PostMessage handler
               // pcsUtil.eventHandler.addHandler(window, 'message', self.receivePostMessage); FREVVO : - not used in External compute
				pcsUtil.eventHandler.addHandler(window, 'message', self.receiveExternalFormPostMessage);
            }());

            // Method to read widget options and do required UI tweaking
            self.readOptions = function() {
                if (self.data.hideActions) {
                    $('#pcs-td-custom-actions', self.rootElement).hide();
                }
                if (self.data.hideSave) {
                    $('#pcs-td-save', self.rootElement).hide();
                }
                if (self.data.hideClose) {
                    $('.pcs-td-close-selector', self.rootElement).hide();
                }
                if (self.data.hideAttachment) {
                    $('#pcs-td-attachments', self.rootElement).hide();
                    $('#pcs-td-link-attachments', self.rootElement).hide();
                }
                if (self.data.hideComments) {
                    $('#pcs-td-comments', self.rootElement).hide();
                    $('#pcs-td-link-comments', self.rootElement).hide();
                }
                if (self.data.hideHistory) {
                    $('#pcs-td-history', self.rootElement).hide();
                    $('#pcs-td-link-history', self.rootElement).hide();
                }
                if (self.data.hideMoreInfo) {
                    $('#pcs-td-moreInfo', self.rootElement).hide();
                    $('#pcs-td-link-moreInfo', self.rootElement).hide();
                }
                if (self.data.hideConversation) {
                    $('#pcs-td-conversation', self.rootElement).hide();
                    $('#pcs-td-link-conversation', self.rootElement).hide();
                }
                if (self.data.hideLinks) {
                    $('#pcs-td-links', self.rootElement).hide();
                }

                if (self.data.formHeight && self.data.formHeight !== '') {
                    $('#pcs-td-form-frame', self.rootElement).css('height', self.data.formHeight);
                }
            };

            self.initComponents = function() {
                self.readOptions();
                self.initTaskdetail();
                self.initTaskHistory();
            };


            self.initTaskHistory = function() {
                if (!ko.components.isRegistered('taskHistory')) {
                    ko.components.register('taskHistory', {
                        template: historyView,
                        viewModel: historyVM
                    });
                }
            };


            self._populateTaskObject = function(task) {
                self.selectedTaskObject = task;

                self.taskObject.title(task.title);
                self.taskObject.shortSummary(task.shortSummary);
                self.taskObject.creator(task.createdBy);

                self.taskObject.fromUser(task.fromUserDisplayName);
                self.taskObject.number(task.number);
                self.taskObject.outcome(task.outcome);
                self.taskObject.processName(task.processName);

                //add dates
				self.taskObject.assignedDate(dateUtil.getFormattedDate( dateUtil.getDateInUserTimezone(task.assignedDate)));
				self.taskObject.createdDate(dateUtil.getFormattedDate(dateUtil.getDateInUserTimezone( task.createdDate)));
				self.taskObject.dueDate(dateUtil.getFormattedDate(dateUtil.getDateInUserTimezone(task.dueDate)));
                self.taskObject.updatedDate(dateUtil.getFormattedDate(dateUtil.getDateInUserTimezone(task.updatedDate)));

                self.taskObject.priority.removeAll();
                self.taskObject.priority.push(self.priorityMap[task.priority]);

                if (task.isDocsEnabledFlag){
					self.attachmentsLabel(self.bundle.pcs.attachments.documents_dialog_title);
				}

                if (task.ownerRole) {
                    self.taskObject.owner(task.ownerRole + ' (' + self.bundle.pcs.taskdetail.role + ')');
                } else if (task.ownerGroup) {
                    self.taskObject.owner(task.ownerGroup + ' (' + self.bundle.pcs.taskdetail.group + ')');
                } else if (task.ownerUser) {
                    self.taskObject.owner(task.ownerUser + ' (' + self.bundle.pcs.taskdetail.user + ')');
                }

                self.taskObject.customActions.removeAll();
                self.taskObject.systemActions.removeAll();

                var isUpdateable = false;

                for (var i = 0; i < task.actionList.length; i++) {
                    var action = task.actionList[i];
                    if (action.actionType === 'System') {
                        self.taskObject.systemActions.push(action);
                    } else {
                        self.taskObject.customActions.push(action);
                    }
                    if (action.actionId === 'UPDATE_TASK_PAYLOAD'){
						isUpdateable = true;
					}
                }

                // var outcome = task.outcome;
                //
                // // Make the detail readOnli as the task is completed
                // if (outcome) {
                //     self.readOnly(true);
                // }
				self.readOnly(!isUpdateable);

            };

            self.openComments = function(data, event) {
                $('#pcs-td-comments', self.rootElement).ojCollapsible({
                    'expanded': true
                });
                $('#pcs-td-comments-container', self.rootElement)[0].scrollIntoView(true);
            };

            self.openAttachments = function() {
                $('#pcs-td-attachments', self.rootElement).ojCollapsible({
                    'expanded': true
                });
                $('#pcs-td-attachment-container', self.rootElement)[0].scrollIntoView(true);
            };

            self.openHistory = function() {
                $('#pcs-td-history', self.rootElement).ojCollapsible({
                    'expanded': true
                });
                $('#pcs-td-history-container', self.rootElement)[0].scrollIntoView(true);
            };

            self.openMoreInfo = function() {
                $('#pcs-td-moreInfo', self.rootElement).ojCollapsible({
                    'expanded': true
                });
                $('#pcs-td-moreInfo-container', self.rootElement)[0].scrollIntoView(false);
            };

            self.openConversation = function() {
                $('#pcs-td-conversation', self.rootElement).ojCollapsible({
                    'expanded': true
                });
                $('#pcs-td-conversation-container', self.rootElement)[0].scrollIntoView(false);
            };

            //Load the components
            self.initComponents();


            self.notifyExternalForm = function(){
				if(self.formType() === 'external'){
					loggerUtil.log('Notifying external form');
					var msg = {
						source:'processUI',
						event:'close',
						data: {}
					}

					var iframe = $('#pcs-td-external-form-iframe', self.rootElement)[0];
					if(iframe){
						iframe =iframe.contentWindow;
						iframe.postMessage(JSON.stringify(msg), '*');
					}
				}
			}


			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in taskdetail Containor');
				self.viewExpandedSubscription.dispose();

				// clean up the events
				self.cleanEvents();

				// clean up form
				self.cleanUpFormContainer();

				self.notifyExternalForm();
			};

		}

        return TaskdetailContainer;
    });
