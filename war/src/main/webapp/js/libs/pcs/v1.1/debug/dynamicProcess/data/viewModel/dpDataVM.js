/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPDetailService','pcs/util/pcsUtil', 'pcs/pcsform/pcsFormUtil' , 'ojs/ojknockout',
		'ojL10n!pcs/resources/nls/pcsSnippetsResource'],
    function(oj, ko, $, InstanceDetail,pcsUtil, pcsFormUtil) {

        'use strict';

        return function(params,componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');
            var service;
            var element = componentInfo.element;
            self.properties = params;

			//Set the resourcebundle
			self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            //current instanceId
            self.instanceId = ko.observable();

            self.dpForm = {};

            //list of all variables
			self.variableList = ko.observableArray([]);

			//cureently selceted variable
			self.selectedVariableDialogTitle = ko.observable('Detail');

			//attribute to hold if the component is standalone or used inside details
			self.isConsumed = ko.observable(false);

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

				if (self.properties.instanceitem ) {
					if(ko.isObservable (self.properties.instanceitem)){
						self.populateData(self.properties.instanceitem());
					}else{
						self.populateData(self.properties.instanceitem);
					}
                } else {
                    self.fetchInstanceDetail();
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


            //Method to populate instance detail data
            self.populateData = function(instanceItem) {
            	if(instanceItem){

            		// Fetch the input Data
					service.fetchProcessDefinition(false, {
						'{processDefinitionId}': instanceItem.getProcessDefinitionId()
					}).then(function(processDefinition) {

						self.dpForm.formMetadataURL = processDefinition.formMetadataURL;
						self.dpForm.inputParam = processDefinition.formInputParam;

						//fetch all variables
						self.fetchVariables();


					}).fail(function(error) {
						self.showErrorRegion();
					});


				}
            };

			/**
			 * Method to fetch all instance variables
			 * @param instanceId
			 */
			self.fetchVariables = function (instanceId){
				// Fetch all the variables
				service.fetchInstanceVariables(false, {
					'{id}': self.instanceId()
				}).then(function(variables) {
					self.populateVariables(variables);

				}).fail(function(error) {
					self.showErrorRegion();
				});
			};

			/**
			 * Method to populate variable data in list
			 * @param variables
			 */
            self.populateVariables = function (variables){
            	//remove the existing data
				self.variableList.removeAll();

				if (!variables) {
					return;
				}
				var isInputParamAccessible = false;

				$.each(variables, function(index, item) {
					//don't add the input param in the list as
					// we will show it upfront
					if(self.dpForm.inputParam && index === self.dpForm.inputParam){
						isInputParamAccessible = true;
						return true;
					}
					var variable = {
						variableName : index,
						initials : pcsUtil.taskInitials(index),
						colorCode : 'rgb(176, 185, 185)',
						url : item
					};
					self.variableList.push(variable);
				});

				// show empty icon if list is empty
				if (self.variableList().length === 0 && !self.dpForm.inputParam){
					self.showEmptyRegion();
				}

				//load the inputParam
				if (isInputParamAccessible && self.dpForm.formMetadataURL && self.dpForm.formMetadataURL !== '') {
					self.loadDpForm();
				} else {
					self.showNoformRegion();
				}
			};

            //For dp forms
            self.loadDpForm = function() {

                //Get the payload
                service.getInstanceVariableData(true, {
                    '{id}': self.instanceId(),
                    '{variableName}': self.dpForm.inputParam
                }).then(
                    function(payload) {
						var parsedData;
						try {
							parsedData = JSON.parse(payload);
						} catch (e) {
							parsedData =payload;
						}
                        var formMetadataURL = pcsUtil.getDpRestURL() +self.dpForm.formMetadataURL;
                        var webFormContainer = $('#pcs-dp-data-iframe-container', element);
                        var formRendererId = 'dpdata-form-' + self.instanceId() + '-' + self.dpForm.inputParam;
                        var properties = {
                            formMetadataUrl : formMetadataURL,
                            payload : parsedData,
                            webFormContainer : webFormContainer,
                            formRendererId : formRendererId,
                            readOnly : true,
							convertJSON: true
						};
                        pcsFormUtil.loadPCSForm(properties)
                            .then(function() {
                                $('#pcs-dp-data-loading', element).hide();
                            }, function(jqXHR) {
                                self.showFormFailMsg();
                            });

                    },
                    function(rejected) {
                        loggerUtil.log(rejected);
                        self.showFormFailMsg();
                    }
                );

            };

			/**
			 * called when a varibale name is clicked
			 * @param data
			 * @param event
			 */
            self.launchVariableDetail = function (data,event){

            	//set the dialog title
				self.selectedVariableDialogTitle(data.variableName);

				//shoe the dialog
				$('#pcs-dp-data-var-dialog', element).ojDialog('open');

				//Get the payload
				service.getInstanceVariableData(true, {
					'{id}': self.instanceId(),
					'{variableName}': data.variableName
				}).then(
					function(variableData) {
						$('#pcs-dp-data-var-body-loading').hide();
						var parsedData;
						try {
							parsedData = JSON.parse(variableData);
						} catch (e) {
							parsedData =variableData;
						}
						//JSON.stringify(variableData, null, 2)
						$('#pcs-dp-data-var-body-content').html('<pre>'+ JSON.stringify(parsedData, null, 2) +'</pre>')
					},
					function(rejected) {
						$('#pcs-dp-data-var-body-loading').hide();
						var msg= 'Error occurred while trying to get detail of ' + data.variableName;
						$('#pcs-dp-data-var-body-content').html('<span>'+ msg +'</span>')
					}
				);
			};

			/**
			 * to close variable detail dialog
			 */
            self.closeVariableDialog  = function (){
				$('#pcs-dp-data-var-dialog').ojDialog('close');
				$('#pcs-dp-data-var-body-loading').show();
				$('#pcs-dp-data-var-body-content').empty();
			};


			/**
			 * When form load fails
			 */
            self.showFormFailMsg = function() {
                $('#pcs-dp-data-form-error', element).show();
                $('#pcs-dp-data-loading', element).hide();
            };


			/**
			 * When no form is asscociated
			 */
            self.showNoformRegion = function() {
                // $('#pcs-dp-data-dummy', element).show();
                // $('#pcs-dp-data-loading', element).hide();
				$('#pcs-dp-data-input-container', element).hide();
            };


			/**
			 * When no variables is asscociated
			 */
			self.showEmptyRegion = function() {
				$('#pcs-dp-data-empty-containor', element).show();
				$('#pcs-dp-data-loading', element).hide();
			};

			/**
			 * When the rest call fails
			 */
			self.showErrorRegion = function() {
				$('#pcs-dp-data-error', element).show();
				$('#pcs-dp-data-loading', element).hide();
			};

			//subscribe to changes in instanceItem
			if(self.properties.instanceitem && ko.isObservable(self.properties.instanceitem)){
				self.instanceItemSubscription= self.properties.instanceitem.subscribe(function(newValue) {
					self.populateData(newValue);
				});
			}

			//Function to clean up the element and un apply its bindings
			self.cleanUpFormContainer = function(){

				var node = $('#pcs-dp-data-iframe-container', self.rootElement);
				if(node && node.length > 0){
					ko.cleanNode(node['0']);
					//Un apply the bindings for the node and its children,
					pcsUtil.unApplyBindings(node, false);
				}

			};

            self.bindingsApplied = function() {
                //temp for Knockoutcomponet
                self.initContext();
            };


            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function() {
                loggerUtil.log('dispose in dp-data');

				if(self.instanceItemSubscription){
					self.instanceItemSubscription.dispose();
				}

				self.cleanUpFormContainer();
            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
